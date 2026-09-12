const zlib = require("zlib");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function solidColorPng(width, height, [r, g, b]) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowLen = width * 3;
  const raw = Buffer.alloc((rowLen + 1) * height);
  for (let y = 0; y < height; y++) {
    const offset = y * (rowLen + 1);
    raw[offset] = 0;
    for (let x = 0; x < width; x++) {
      raw[offset + 1 + x * 3] = r;
      raw[offset + 1 + x * 3 + 1] = g;
      raw[offset + 1 + x * 3 + 2] = b;
    }
  }
  const idat = zlib.deflateSync(raw);

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

async function main() {
  const uploadDir = path.join(__dirname, "..", "public", "uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const prisma = new PrismaClient();
  await prisma.product.deleteMany({});

  const products = [
    { name: "Seda King Size XL", description: "Seda fina na medida certa, queima uniforme do início ao fim.", price: 12.9, color: [45, 140, 150], category: "Sedas" },
    { name: "Case Puff", description: "Estojo compacto e resistente pra levar seus acessórios com discrição.", price: 79.9, color: [180, 45, 95], category: "Bags organizadoras" },
    { name: "Case Sadhu", description: "Estojo premium com acabamento emborrachado e fecho reforçado.", price: 129.9, color: [90, 95, 70], category: "Bags organizadoras" },
    { name: "Cinzeiro Retrátil", description: "Cinzeiro discreto, fácil de limpar e guardar.", price: 34.9, color: [40, 40, 45], category: "Recipientes" },
    { name: "Piteira de Vidro", description: "Piteira de vidro borossilicato, reutilizável e fácil de higienizar.", price: 19.9, color: [120, 170, 150], category: "Piteiras", variants: ["Transparente", "Âmbar", "Azul"] },
    { name: "Moedor 4 Partes", description: "Moedor em alumínio com peneira integrada e imã de fechamento.", price: 44.9, color: [150, 110, 40], category: "Moedores", variants: ["Preto", "Prata", "Dourado"] },
  ];

  for (const p of products) {
    const filename = `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
    fs.writeFileSync(path.join(uploadDir, filename), solidColorPng(500, 500, p.color));
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        images: { create: [{ url: `/uploads/${filename}`, order: 0 }] },
        status: "AVAILABLE",
        category: p.category,
        variants: p.variants
          ? { create: p.variants.map((name) => ({ name, status: "AVAILABLE" })) }
          : undefined,
      },
    });
  }

  console.log("Seeded", products.length, "products");
  await prisma.$disconnect();
}

main();

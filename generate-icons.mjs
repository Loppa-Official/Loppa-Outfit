import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = {
    'mdpi': 48,
    'hdpi': 72,
    'xhdpi': 96,
    'xxhdpi': 144,
    'xxxhdpi': 192
};

const foregroundSizes = {
    'mdpi': 108,
    'hdpi': 162,
    'xhdpi': 216,
    'xxhdpi': 324,
    'xxxhdpi': 432
};

async function generateIcons() {
    const svgPath = path.join(__dirname, 'public', 'icon.svg');
    const svgBuffer = fs.readFileSync(svgPath);

    const androidResPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

    // Generate regular icons
    for (const [density, size] of Object.entries(sizes)) {
        const outputDir = path.join(androidResPath, `mipmap-${density}`);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // ic_launcher.png
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(path.join(outputDir, 'ic_launcher.png'));

        // ic_launcher_round.png (same for now)
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(path.join(outputDir, 'ic_launcher_round.png'));

        console.log(`Generated ${density} icons (${size}x${size})`);
    }

    // Generate adaptive icon foreground
    for (const [density, size] of Object.entries(foregroundSizes)) {
        const outputDir = path.join(androidResPath, `mipmap-${density}`);

        // Create foreground with minimal padding for adaptive icon (fill more space)
        const padding = Math.floor(size * 0.05);
        const iconSize = size - (padding * 2);

        await sharp(svgBuffer)
            .resize(iconSize, iconSize)
            .extend({
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toFile(path.join(outputDir, 'ic_launcher_foreground.png'));

        console.log(`Generated ${density} foreground (${size}x${size})`);
    }

    console.log('✅ All icons generated!');
}

generateIcons().catch(console.error);

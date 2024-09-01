// src/utils/imageLoader.ts
const images: Record<string, { default: string }> = import.meta.glob('../assets/svg/*.svg', { eager: true });

const getImagePath = (iconName: string) => {
    const imageKey = `../assets/svg/${iconName}.svg`;
    return images[imageKey].default;
};

export default getImagePath;
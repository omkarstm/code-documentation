const ALLOWED_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".html", ".json", ".md", ".yml", ".yaml"];
const IMPORTANT_FILES = ["package.json", "dockerfile", "contributing.md", "readme.md", "license", ".gitignore"];
const EXCLUDED_DIRECTORIES = ["node_modules", "__MACOSX", "dist", "build", "coverage"];

export function isAllowedFile(name: string): boolean {
    const normalized = name.toLowerCase().replace(/\\/g, "/");
    
    // Check if file is in an excluded directory
    if (EXCLUDED_DIRECTORIES.some(dir => normalized.includes(`/${dir}/`))) {
        return false;
    }
    
    // Always include important config files regardless of location
    if (IMPORTANT_FILES.some(file => normalized.endsWith(file.toLowerCase()))) {
        return true;
    }
    
    // Include files in src directory
    if (normalized.includes("/src/") || normalized.startsWith("src/")) {
        return ALLOWED_EXTENSIONS.some(ext => normalized.endsWith(ext));
    }
    
    // Include files in common important directories
    const importantDirs = ["config", "routes", "public", "views", "controllers"];
    if (importantDirs.some(dir => normalized.includes(`/${dir}/`) || normalized.startsWith(`${dir}/`))) {
        return ALLOWED_EXTENSIONS.some(ext => normalized.endsWith(ext));
    }
    
    return false;
}

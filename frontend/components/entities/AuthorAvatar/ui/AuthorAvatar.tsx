import Image from "next/image";

interface AuthorAvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AuthorAvatar({
  src,
  alt,
  size = "md",
  className = "",
}: AuthorAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Получаем инициалы из alt текста
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}
    >
      {src ? (
        <Image
          src={`/api/proxy/image?id=${src}` || "/placeholder.svg"}
          alt={alt}
          width={size === "sm" ? 32 : size === "md" ? 48 : 64}
          height={size === "sm" ? 32 : size === "md" ? 48 : 64}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={`font-medium text-white ${textSizeClasses[size]}`}>
          {getInitials(alt)}
        </span>
      )}
    </div>
  );
}

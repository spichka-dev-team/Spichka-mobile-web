import { AuthorAvatar } from "@/components/entities/AuthorAvatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, CheckCircle } from "lucide-react";
import { CreatorType } from "@/components/shared/types/models";

interface AuthorHeaderProps {
  author: CreatorType;
}

export function AuthorHeader({ author }: AuthorHeaderProps) {
  return (
    <div className="border-b border-gray-200 pb-8 mb-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <AuthorAvatar
          src={author.data.avatar}
          alt={`${author.data.first_name} ${author.data.last_name}`}
          size="lg"
          className="flex-shrink-0"
        />

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-white">
              {author.data.first_name} {author.data.last_name}
            </h2>
            {author.data.verification_status === "VERIFIED" && (
              <CheckCircle className="w-5 h-5 text-blue-500" />
            )}
          </div>

          <p className="text-lg text-white mb-2">@{author.data.username}</p>

          {author.data.title && (
            <p className="text-white font-medium mb-3">{author.data.title}</p>
          )}

          {author.data.description && (
            <p className="text-white mb-4 leading-relaxed">
              {author.data.description}
            </p>
          )}

          {/* Location and Email */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm text-white">
            {author.data.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{author.data.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{author.data.email}</span>
            </div>
          </div>

          {/* Tags */}
          {author.data.tags && author.data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {author.data.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

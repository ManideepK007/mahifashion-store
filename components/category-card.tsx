import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { type Category } from "@/lib/data";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.id}`}>
      <Card className="group hover:border-primary/50 transition-colors h-full">
        <CardContent className="p-6 text-center">
          <span className="text-4xl mb-4 block" role="img" aria-label={category.name}>
            {category.icon}
          </span>
          <h3 className="font-medium text-foreground mb-1">{category.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {category.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

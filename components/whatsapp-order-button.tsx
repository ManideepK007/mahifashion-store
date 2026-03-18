import { MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { storeInfo } from "@/lib/data";

interface WhatsAppOrderButtonProps extends Omit<ButtonProps, "asChild"> {
  productName: string;
  price?: number;
  customMessage?: string;
  phoneNumber?: string;
}

export function WhatsAppOrderButton({
  productName,
  price,
  customMessage,
  phoneNumber = storeInfo.whatsapp,
  className,
  children,
  ...props
}: WhatsAppOrderButtonProps) {
  const defaultMessage = price
    ? `Hello, I want to order this product: ${productName} ($${price.toFixed(2)})`
    : `Hello, I want to order this product: ${productName}`;

  const message = customMessage || defaultMessage;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;

  return (
    <Button
      asChild
      className={`bg-[#25D366] hover:bg-[#128C7E] text-white ${className || ""}`}
      {...props}
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 h-5 w-5" />
        {children || "Order via WhatsApp"}
      </a>
    </Button>
  );
}

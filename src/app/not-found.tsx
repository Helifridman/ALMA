import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-16 text-center space-y-4">
      <p className="text-6xl">🧭</p>
      <h1 className="text-2xl font-extrabold">הדף הזה לא קיים</h1>
      <p className="text-ink-soft">אולי הקישור השתנה. נחזור למסך הבית.</p>
      <Button href="/">למסך הבית</Button>
    </div>
  );
}

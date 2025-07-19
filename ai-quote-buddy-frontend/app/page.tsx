import QuoteGenerator from "@/components/quote-generator";
import { ModeToggle } from "@/components/toggle-theme";
import Link from "next/link";
import Logo from "@/components/logo";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo/>
          </div>
          <ModeToggle/>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Get Inspired with AI-Generated Quotes
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Share your thoughts, feelings, or topics, and let AI create meaningful quotes to inspire your day.
          </p>
        </div>
        <QuoteGenerator/>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; 2025 AI Quote Buddy. Powered by inspiration.</p>
          <p>Made by Abdullah</p>
             <Link className="mr-[10px]" target="_" href="https://www.linkedin.com/in/abdullah-arshad-6b4949284/">LinkedIn</Link>
              <Link target="_" href="https://github.com/Abdullah-765">Github</Link>
        </div>
      </footer>
    </div>
  );
}
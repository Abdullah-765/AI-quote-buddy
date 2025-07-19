// "use client";
// import { useState } from "react";
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/toggle-theme";
// import Loader from "@/components/loader";

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [quote, setQuote] = useState("");
//   const [mood, setMood] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [explanation, setExplanation] = useState("")
//   const [showHide, setShowHide] = useState(0)
//   const [text, setText] = useState("Show Explanation")

//   function showHideExplanation(){
//     if (showHide == 1 && text == "Hide Explanation"){
//       setShowHide(0)
//       setText("Show Explanation")
//     }
//     else{
//       setShowHide(1)
//       setText("Hide Explanation")
//     }
//   }

//   async function handleSubmit(e: React.FormEvent) {
//   e.preventDefault();
//   setLoading(true);
//   setQuote(""); // Optional: reset previous quote
//   setMood("");
//   setExplanation("");

//   try {
//     const response = await fetch("http://localhost:8000/generate-quote", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message: input }),
//     });

//     if (!response.ok) {
//       throw new Error("Something went wrong");
//     }

//     const data = await response.json();
//     setQuote(data.quote);
//     setMood(data.mood);
//     setExplanation(data.explanation)
//   } catch (error) {
//     console.error("Error fetching quote:", error);
//     setQuote("Sorry, something went wrong.");
//   } finally {
//     setLoading(false);
//   }
// }
  
//   return (
//     <div>
//       <ModeToggle/>
//       <form onSubmit={handleSubmit}>
//         <Textarea
//           placeholder="what are you feeling?"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
 
//       <h1>{quote}</h1>
//       <h1>{mood}</h1>
//       <Button onClick={() => showHideExplanation()}>{text}</Button>
//       {showHide == 1 &&
//               <h1>explanation:{explanation}</h1>
//       }

//     </div>
//   );
// }

import QuoteGenerator from "@/components/quote-generator";
import { ModeToggle } from "@/components/toggle-theme";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <div className="h-8 w-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">Q</span>
            </div> */}
            <Logo/>
            {/* <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              AI Quote Buddy
            </h1> */}
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
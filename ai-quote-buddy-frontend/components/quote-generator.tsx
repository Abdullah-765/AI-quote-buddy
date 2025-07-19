"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Loader2, MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";

export default function QuoteGenerator() {
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState("");
  const [mood, setMood] = useState("");
  const [moodColor, setMoodColor] = useState("")
  const [explanation, setExplanation] = useState("")
    const [isGenerating, setIsGenerating] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false)

//   function showHideExplanation(){
//     if (showHide == 1 && text == "Hide Explanation"){
//       showExplanation(0)
//       setText("Show Explanation")
//     }
//     else{
//       setShowHide(1)
//       setText("Hide Explanation")
//     }
//   }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
   setIsGenerating(true)
  setQuote(""); // Optional: reset previous quote
  setMood("");
  setExplanation("");
  setShowExplanation(false);

  try {
    const response = await fetch("http://localhost:8000/generate-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    setQuote(data.quote);
    setMood(data.mood);
    setExplanation(data.explanation)
    setMoodColor(data.color)
  } catch (error) {
    console.error("Error fetching quote:", error);
    setQuote("Sorry, something went wrong.");
  } finally {
    setIsGenerating(false);
  }
}
  const explainQuote = async () => {
    if (!quote) return;

    setIsExplaining(true);
    setShowExplanation(true);

    setExplanation(explanation);
    setIsExplaining(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
       <Card className="border-2 border-border/20 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Ask for a Quote
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
        <Textarea
              placeholder="Enter what you're feeling"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-12 bg-input-background border-border/30 focus:border-primary/50 transition-colors"
            />
        <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isGenerating}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Quote...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Quote
                </>
              )}
            </Button>
            </div>
        </CardContent>
      </Card>
 
      {(quote || isGenerating) && (
        <Card className="border-2 border-border/20 shadow-lg">

          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Your Quote
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGenerating ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-accent/50 to-accent/30 p-6 rounded-lg border border-border/30">
                  <p className="text-lg text-center italic leading-relaxed">
                    "{quote}"
                  </p>
                </div>
                <Button
                  onClick={explainQuote}
                  variant="outline"
                  className="w-full h-12 border-border/30 hover:border-primary/50 transition-all duration-200"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Explain Quote
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {showExplanation && (
        <Card className="border-2 border-border/20 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Quote Explanation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isExplaining ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-6 rounded-lg border border-border/30">
                <p className="leading-relaxed text-muted-foreground">
                  {explanation}
                </p>
              </div>
      )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
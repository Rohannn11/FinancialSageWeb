
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIVoiceInput } from "@/components/ui/AIVoiceInput";
import { PlaceholdersAndVanishInput } from "@/components/ui/PlaceholdersAndVanishInput";
import { cn } from "@/lib/utils";

export function AIChat() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  
  const placeholders = [
    "What's the total revenue trend for this quarter?",
    "Show me the highest expense categories",
    "Analyze the profit margins over time",
    "Identify any unusual transactions",
    "Compare current performance with last period",
  ];

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement;
    const message = input.value.trim();
    
    if (message) {
      setMessages(prev => [...prev, { text: message, isUser: true }]);
      // Here you would typically make an API call to process the message
      // For now, we'll just echo back
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I understand you're asking about " + message + ". This feature is coming soon!", 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  const handleVoiceStart = () => {
    console.log("Voice recording started");
  };

  const handleVoiceStop = (duration: number) => {
    console.log("Voice recording stopped after", duration, "seconds");
    // Here you would typically process the voice recording
  };

  return (
    <Card className="shadow-card shadow-card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Chat with AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[200px] max-h-[400px] overflow-y-auto space-y-4 p-4 rounded-lg bg-muted/30">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex w-full",
                msg.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  msg.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p>Ask me anything about your financial data!</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => {}}
            onSubmit={handleMessageSubmit}
          />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or use voice input
              </span>
            </div>
          </div>
          
          <AIVoiceInput
            onStart={handleVoiceStart}
            onStop={handleVoiceStop}
            className="pt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}

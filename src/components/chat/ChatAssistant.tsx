 import { useState, useRef, useEffect } from "react";
 import { MessageSquare, X, Send } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface Message {
   text: string;
   side: "bot" | "user";
 }
 
 const responses: Record<string, string> = {
   "produtos": "Oferecemos massage guns de alta performance, óleos relaxantes e kits de massagem profissional. Explore a nossa 'Shop' para ver todos!",
   "envio": "Realizamos envios para todo o país. O prazo médio de entrega é de 2 a 5 dias úteis.",
   "pagamento": "Aceitamos diversos métodos: Express, BFA, SOL, BCI e BAI. Pode ver os detalhes no checkout.",
   "massagem": "As nossas massage guns ajudam na recuperação muscular, redução de stress e alívio de dores crónicas.",
   "contacto": "Pode contactar-nos pelo telefone +351 800 123 456 ou através das nossas redes sociais.",
   "ajuda": "Olá! Posso ajudar com informações sobre produtos, envios, pagamentos ou benefícios da massagem. O que deseja saber?",
   "default": "Obrigado pela sua mensagem! Para questões mais específicas, pode consultar a nossa página 'Sobre' ou entrar em contacto direto."
 };
 
 export const ChatAssistant = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [input, setInput] = useState("");
   const [messages, setMessages] = useState<Message[]>([
     { text: "Olá! Sou o assistente da Covia. Como posso ajudar você hoje?", side: "bot" }
   ]);
   const messagesEndRef = useRef<HTMLDivElement>(null);
 
   const scrollToBottom = () => {
     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };
 
   useEffect(() => {
     if (isOpen) scrollToBottom();
   }, [messages, isOpen]);
 
   const handleSend = (e: React.FormEvent) => {
     e.preventDefault();
     if (!input.trim()) return;
 
     const userText = input.trim();
     setMessages(prev => [...prev, { text: userText, side: "user" }]);
     setInput("");
 
     setTimeout(() => {
       const lowerText = userText.toLowerCase();
       let reply = responses.default;
       for (const key in responses) {
         if (lowerText.includes(key)) {
           reply = responses[key];
           break;
         }
       }
       setMessages(prev => [...prev, { text: reply, side: "bot" }]);
     }, 600);
   };
 
   return (
     <div className="fixed bottom-6 right-6 z-50">
       {!isOpen && (
         <Button
           onClick={() => setIsOpen(true)}
           className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform bg-primary text-primary-foreground"
           size="icon"
         >
           <MessageSquare className="h-6 w-6" />
         </Button>
       )}
 
       {isOpen && (
         <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
           <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
             <div>
               <h3 className="font-bold text-sm">Covia Assistente</h3>
               <p className="text-[10px] opacity-80">Estamos online para ajudar</p>
             </div>
             <Button
               variant="ghost"
               size="icon"
               className="h-8 w-8 text-primary-foreground hover:bg-white/10"
               onClick={() => setIsOpen(false)}
             >
               <X className="h-4 w-4" />
             </Button>
           </div>
 
           <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
             {messages.map((msg, i) => (
               <div
                 key={i}
                 className={`flex ${msg.side === "user" ? "justify-end" : "justify-start"}`}
               >
                 <div
                   className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                     msg.side === "user"
                       ? "bg-primary text-primary-foreground rounded-br-none"
                       : "bg-card border border-border text-foreground rounded-bl-none"
                   }`}
                 >
                   {msg.text}
                 </div>
               </div>
             ))}
             <div ref={messagesEndRef} />
           </div>
 
           <form onSubmit={handleSend} className="p-3 bg-card border-t border-border flex gap-2">
             <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Escreva a sua mensagem..."
               className="flex-1 bg-muted border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
             />
             <Button type="submit" size="icon" className="h-9 w-9 rounded-xl">
               <Send className="h-4 w-4" />
             </Button>
           </form>
         </div>
       )}
     </div>
   );
 };
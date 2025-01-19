import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  rawJson?: any;
}

function JsonDisplay({ data }: { data: any }) {
  const formatResponse = (data: any) => {
    if (!data) return null;

    try {
      const jsonData = typeof data === 'string' ? JSON.parse(data) : data;

      const formatSection = (title: string, items: any[]) => (
        <div key={title} className="mb-8">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <ol className="list-decimal pl-5 space-y-4">
            {items.map((item, index) => (
              <li key={index}>
                <p className="font-semibold">{item.title}</p>
                {item.points && (
                  <ul className="list-disc pl-5 space-y-1">
                    {item.points.map((point: string, pointIndex: number) => (
                      <li key={pointIndex} className="text-gray-600">{point}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          <hr className="my-4 border-gray-200" />
        </div>
      );

      return (
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          {Object.entries(jsonData).map(([sectionTitle, sectionItems]) =>
            formatSection(
              sectionTitle.replace(/_/g, ' ').toUpperCase(),
              Array.isArray(sectionItems)
                ? sectionItems.map((item: any) => ({
                    title: item.title || item.name || JSON.stringify(item),
                    points: item.points || item.description ? [item.points || item.description].flat() : undefined,
                  }))
                : [{ title: String(sectionItems) }]
            )
          )}
        </div>
      );
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return <p className="text-red-500">Failed to parse JSON data.</p>;
    }
  };

  return formatResponse(data);
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/lf/7bf70436-b4ef-46e9-ac71-a79c55927694/api/v1/run/50501172-1061-4314-b580-59d0f74f8081', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer AstraCS:HOPoUYgAaGhTeZwryRQOArbf:fe2c4cb68685276749eb1825ab4a028d5f4188f22b2d5595097510ebe69529bc',
        },
        body: JSON.stringify({
          input_value: userMessage.content,
          output_type: 'chat',
          input_type: 'chat',
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: typeof data === 'string' ? data : JSON.stringify(data),
        rawJson: data,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message) => {
    const messageClasses = message.type === 'user' ? 'bg-blue-100 ml-auto' : 'bg-white';

    return (
      <div className={`p-4 rounded-lg max-w-[80%] mb-4 ${messageClasses} shadow-sm`}>
        {message.type === 'user' ? (
          <p className="text-blue-900">{message.content}</p>
        ) : (
          <JsonDisplay data={message.rawJson} />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Chat Interface</h1>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm mb-4 p-4 h-[calc(100vh-16rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Start a conversation to see structured responses</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>{renderMessage(message)}</div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;

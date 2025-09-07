const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      {/* Early Preview pill */}
      <div className="mb-5 px-4 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Early Preview
      </div>

      {/* Orin AI Heading */}
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        Orin AI
      </h1>

      {/* Sub Instructions */}
      <div className="space-y-2 text-gray-500 dark:text-gray-400 text-sm max-w-md leading-relaxed">
        <p>1. Create a chat from the sidebar to start chatting.</p>
        <p>
          2. To continue an old conversation, select a chat from the sidebar.
        </p>
        <p>3. Ask questions or explore ideas with Orin AI.</p>
      </div>
    </div>
  );
};

export default EmptyChat;

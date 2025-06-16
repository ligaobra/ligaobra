'use client';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export default function Toast({ message, type }: ToastProps) {
  const bgColor =
    type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`fixed top-4 right-4 px-6 py-3 rounded shadow text-white ${bgColor} z-50`}>
      {message}
    </div>
  );
}

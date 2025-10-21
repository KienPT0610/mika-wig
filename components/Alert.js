import React, { useState } from "react";
import { AlertType } from "../constanst";

const CONFIG = {
  [AlertType.SUCCESS]: {
    colorBg: "bg-emerald-500",
    colorText: "text-emerald-500",
    title: "Success",
    iconPath:
      "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z",
  },
  [AlertType.INFO]: {
    colorBg: "bg-blue-500",
    colorText: "text-blue-500",
    title: "Info",
    iconPath:
      "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z",
  },
  [AlertType.WARNING]: {
    colorBg: "bg-yellow-400",
    colorText: "text-yellow-400",
    title: "Warning",
    iconPath:
      "M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z",
  },
  [AlertType.ERROR]: {
    colorBg: "bg-red-500",
    colorText: "text-red-500",
    title: "Error",
    iconPath:
      "M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z",
  },
};

export default function Alert({ type = AlertType.INFO, content }) {

  const alert = CONFIG[type] || CONFIG[AlertType.INFO];
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-slide-up">
      <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg border">
        <div className={`flex items-center justify-center w-12 ${alert.colorBg}`}>
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={alert.iconPath} />
          </svg>
        </div>
        <div className="px-4 py-2 -mx-3">
          <button
            onClick={() => setVisible(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          <div className="mx-1">
            <span className={`font-semibold ${alert.colorText}`}>
              {alert.title}
            </span>
            <p className="text-sm text-gray-600">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

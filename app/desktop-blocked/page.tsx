import Image from "next/image";
import PhoneImage from "@/public/images/desktop.png";
import Qr from "@/public/images/qr.jpg";

export default function DesktopBlockedPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 overflow-hidden relative">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-36 items-center relative z-10">
        {/* Left side - App image with gradient circle */}
        <div className="flex justify-center lg:justify-end">
          <div
            className="relative w-96 h-96 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #deb88f 0%, #f16001 40%, #c10801 70%)",
            }}
          >
            <div className="absolute inset-0 right-6 flex items-center justify-center">
              <Image
                src={PhoneImage}
                width={524}
                height={802}
                alt="Спичка приложение"
              />
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="text-white space-y-8">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              спичка у вас в<br />
              кармане
            </h1>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>Платформа камерных событий и живых встреч.</p>

              <p>
                Находите тёплые мероприятия в своём городе,
                <br />
                знакомьтесь с людьми по интересам и создавайте
                <br />
                свои события.
              </p>

              <p>
                От уютных квартирников и творческих митапов до
                <br />
                секретных лекций и арт-вечеров — всё, что
                <br />
                объединяет людей и оставляет воспоминания.
              </p>
            </div>
          </div>

          {/* Download buttons and QR */}
          <div className="flex items-center space-x-6">
            <div className="space-y-4">
              {/* <a href="#" className="block">
                <div className="bg-white text-black px-6 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Загрузить в</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
              </a>

             
              <a href="#" className="block">
                <div className="bg-white text-black px-6 py-3 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Доступно в</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>
              </a> */}
            </div>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg">
              <Image src={Qr} width={150} height={150} alt="QR Code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

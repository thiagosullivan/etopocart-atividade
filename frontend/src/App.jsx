import { ArrowBigLeft } from "lucide-react";

import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "./components/AppSidebar";
import Footer from "./components/Footer";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { InteractiveMap } from "./components/InteractiveMap";

import { LocationProvider } from "./contexts/LocationContext";

function App() {

  return (
    <LocationProvider>
      <SidebarProvider>
          <main className="flex w-full">
            <AppSidebar />
            <section className="w-full">
              <div className="h-screen"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                        url(/brasilia-bg.jpg)
                      `,
                    }}
              >
                <SidebarTrigger className="mb-2" />
                <div className="flex mb-4 justify-center items-center px-2">
                  <ArrowBigLeft className="h-10 w-10 max-lg:hidden" />
                  <h1 className="max-lg:text-left text-center text-xl font-bold ml-2"> Você pode verificar, excluir ou salvar os endereços no menu à esquerda</h1>
                </div>
                <InteractiveMap />
              </div>
              <Footer />
            </section>
            <Toaster richColors />
          </main>
        </SidebarProvider>
    </LocationProvider>
  )
}

export default App

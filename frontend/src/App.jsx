import { AppSidebar } from "./components/AppSidebar";
import { Button } from "./components/ui/button";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { ArrowBigLeft } from "lucide-react";

function App() {

  return (
    <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="w-full">
            <div className="h-screen"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                      url(/brasilia-bg.jpg)
                    `,
                  }}
            >
              <SidebarTrigger className="mb-2" />
              <div className="flex mb-4 justify-center items-center">
                <ArrowBigLeft className="h-10 w-10" />
                <h1 className="text-center text-xl font-bold ml-2"> Você pode verificar, excluir ou salvar os endereços no menu à esquerda</h1>
              </div>
              {/* <Locations /> */}
            </div>
              {/* <Footer /> */}
          </main>
        </div>
      </SidebarProvider>
  )
}

export default App

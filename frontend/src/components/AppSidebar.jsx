import { useState } from "react";
import { Loader2, MapPin, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { Button } from "./ui/button";
import { PopupUpdateLocation } from "./PopupUpdateLocation";

import { useLocation } from "../hooks/use-location";


export function AppSidebar() {
  const { locations, deleteSavedLocation } = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [locationDataToUpdate, setlocationDataToUpdate] = useState(null);
  const [loading, setLoading] = useState(false)

  async function delLocationHandler(location){
    setLoading(true)
    try {
      await deleteSavedLocation(location.id);
    } catch (error) {
      console.log(error)
      toast.error("Erro ao remover localização.")
    } finally {
      toast.success("Localização removida com sucesso!")
    }
    setLoading(false)
  }
  
  async function updateLocationHandler(location){
    if(!location){
      return
    }
    try {
      setIsDialogOpen(true)
      setlocationDataToUpdate(location)
    } catch (error) { 
      console.log(error)
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="p-8 mb-4">
            <img src="./e-topocart.png" />
          </SidebarGroupLabel>
          <div className="border-b border-gray-400" />
          <SidebarGroupContent className="px-2 py-6">
            <div className="flex items-center gap-2">
              <MapPin />
              <p className="text-2xl">Marcações</p>
            </div>
            <SidebarMenu>
              {locations.map((location) => (
                <SidebarMenuItem key={location.id}>
                    <div className="flex justify-between border-t  pt-3 mt-5">
                      <p className="text-xl truncate">{location.properties.name}</p>
                      <div className="flex justify-end gap-1">
                        <Button variant="outline" onClick={() => updateLocationHandler(location)} className="h-8 w-8">
                          <Pencil />
                        </Button>
                        <Button onClick={() => delLocationHandler(location)} className="h-8 w-8" disabled={loading}>
                          {loading ? <Loader2 className="animate-spin h-4 w-4"/> : <Trash2 />}
                        </Button>
                      </div>
                    </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <PopupUpdateLocation
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        locationDataToUpdate={locationDataToUpdate}
      />
    </Sidebar>
  )
}
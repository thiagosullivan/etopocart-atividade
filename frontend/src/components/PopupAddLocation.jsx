import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { Loader2 } from "lucide-react";

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { LocationContext } from "../contexts/LocationContext";

export function PopupAddLocation({ open, setOpen, newLocationData }) {
  const { addLocation } = useContext(LocationContext);
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      name: newLocationData?.properties.name || "",
      description: newLocationData?.properties.description || "",
    },
  });

  async function onSubmit(values) {
    setLoading(true)
    
    try {
        const updatedLocationData = {
          ...newLocationData,
          properties: {
            ...newLocationData.properties,
            name: values.name,
            description: values.description,
          },
        };
    
        await addLocation(updatedLocationData);
        setOpen(false);
        form.reset();
        
    } catch (error) {
        console.log(error, 'Erro ao enviar o formulário.')
        toast.error('Ocorreu um erro ao enviar o formulário.')
    } finally {
        setLoading(false)
        toast.success('Nova localização adicionada com sucesso!')
    }

  }

  useEffect(() => {
  if (newLocationData) {
    form.reset({
      name: newLocationData.properties.name || "",
      description: newLocationData.properties.description || "",
    });
  }
}, [newLocationData, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="mb-4">
                <DialogTitle>Nova localização no mapa</DialogTitle>
                {newLocationData ? (
                  <DialogDescription>
                    Local em {newLocationData.geometry.coordinates[0].toFixed(4)}, {newLocationData.geometry.coordinates[1].toFixed(4)}
                  </DialogDescription>
                ) : (
                  <DialogDescription>Carregando localização...</DialogDescription>
                )}
              </DialogHeader>
              <div className="grid gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="animate-spin h-4 w-4" />}
                  Salvar
                </Button>
              </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

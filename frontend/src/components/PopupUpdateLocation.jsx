import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { LocationContext } from "../contexts/LocationContext";

export function PopupUpdateLocation({ open, setOpen, locationDataToUpdate }) {
  const { updateSavedLocation } = useContext(LocationContext);
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      name: locationDataToUpdate?.properties.name || "",
      description: locationDataToUpdate?.properties.description || "",
    },
  });

  async function onSubmit(values) {
    setLoading(true)
    try {
      const updatedLocationData = {
        ...locationDataToUpdate,
        properties: {
          ...locationDataToUpdate.properties,
          name: values.name,
          description: values.description,
        },
      };
  
      await updateSavedLocation(updatedLocationData);
      setOpen(false);
      form.reset();
      
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao enviar o formulário.')
    } finally {
        toast.success('Informações atualizadas com sucesso!')
        setLoading(false)
    }
  }

  useEffect(() => {
  if (locationDataToUpdate) {
    form.reset({
      name: locationDataToUpdate.properties.name || "",
      description: locationDataToUpdate.properties.description || "",
    });
  }
}, [locationDataToUpdate, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader className="mb-4">
                        <DialogTitle>Nova localização no mapa</DialogTitle>
                        {locationDataToUpdate ? (
                        <DialogDescription>
                            Local em {locationDataToUpdate.geometry.coordinates[0].toFixed(4)}, {locationDataToUpdate.geometry.coordinates[1].toFixed(4)}
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

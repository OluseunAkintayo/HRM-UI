import * as yup from 'yup';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, SetStateAction } from 'react';
import { IEducation } from '../types';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface IAddItemModal {
  open: boolean;
  close: () => void;
  setItems: Dispatch<SetStateAction<Array<IEducation> | null>>;
  items: Array<IEducation> | null;
}


export const AddItemModal = ({ open, close, setItems, items }: IAddItemModal) => {
  const toast = useToast().toast;
  const schema = yup.object().shape({
    name: yup.string().required("School name is required"),
    location: yup.string().required("Location is required"),
    startYear: yup.string().required("Start year is required"),
    endYear: yup.string().required("End year is required"),
    qualificationObtained: yup.string().required("Qualification obtained is required")
  });

  const form = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit, register, formState: { errors: formErrors } } = form;
  const [loading, setLoading] = React.useState<boolean>(false);
  const submit: SubmitHandler<IEducation> = (values) => {
    setLoading(true);
    setTimeout(() => {
      setItems(items ? [...items, values] : [values]);
      close();
      toast({
        title: "Success!",
        description: "Item added successfully"
      });
    }, 2000);
  }
  return (
    <AlertDialog open={open} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add academic qualification</AlertDialogTitle>
          <AlertDialogDescription>
            <form autoComplete='off' onSubmit={handleSubmit(submit)} className='mt-8'>
              <div className='sm:grid sm:gap-4'>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="name" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.name && "text-destructive"
                  )}>Name</Label>
                  <Input placeholder="Enter school name" id="title" {...register("name")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.name?.message}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startYear" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.startYear && "text-destructive"
                  )}>Start year</Label>
                  <Input placeholder="Enter start year" id="startYear" {...register("startYear")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.startYear?.message}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endYear" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.endYear && "text-destructive"
                  )}>Graduation year</Label>
                  <Input placeholder="Enter graduation year" id="endYear" {...register("endYear")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.endYear?.message}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="location" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.location && "text-destructive"
                  )}>Location</Label>
                  <Input placeholder="Enter school location" id="location" {...register("location")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.location?.message}</p>
                </div>
                <div className="space-y-2 w-full col-span-2">
                  <Label htmlFor="qualificationObtained" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.qualificationObtained && "text-destructive"
                  )}>Qualification Obtained</Label>
                  <Input placeholder="Enter qualification" id="email" {...register("qualificationObtained")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.qualificationObtained?.message}</p>
                </div>

                <div className='col-span-2 mt-4 grid grid-cols-2 gap-4'>
                  <Button type="submit" disabled={loading}>{loading ? <Loader className='animate-spin' /> : "Submit"}</Button>
                  <Button variant="destructive" disabled={loading} type="button" onClick={close}>close</Button>
                </div>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

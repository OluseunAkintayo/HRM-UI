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
import { IWork } from '../types';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox"

interface IAddWorkModal {
  open: boolean;
  close: () => void;
  setItems: Dispatch<SetStateAction<Array<IWork> | null>>;
  items: Array<IWork> | null;
}

export const AddWorkModal = ({ open, close, setItems, items }: IAddWorkModal) => {
  const [isCurrent, setIsCurrent] = React.useState<boolean>(false);
  const toast = useToast().toast;
  const schema = yup.object().shape({
    companyName: yup.string().required("School name is required"),
    startDate: yup
      .date().typeError("Invalid date format")
      .max(new Date(), "Date cannot be in the future")
      .required("Date of birth is required"),
    endDate:
      isCurrent ?
        yup
          .date().typeError("Invalid date format")
          .max(new Date(), "Date cannot be in the future")
        :
        yup
          .date().typeError("Invalid date format")
          .max(new Date(), "Date cannot be in the future")
          .required("Date of birth is required"),
    role: yup.string().required("Required field"),
    summary: yup.string().required("Required field"),
    isCurrent: yup.boolean().required("Required field")
  });

  const form = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit, register, setValue, watch, formState: { errors: formErrors } } = form;

  const [loading, setLoading] = React.useState<boolean>(false);
  const submit: SubmitHandler<IWork> = (values) => {
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

  console.log({ watch: watch(), formErrors});
  
  return (
    <AlertDialog open={open} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add work history</AlertDialogTitle>
          <AlertDialogDescription>
            <form autoComplete='off' onSubmit={handleSubmit(submit)} className='mt-8'>
              <div className='sm:grid sm:gap-4'>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="name" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.companyName && "text-destructive"
                  )}>Company Name</Label>
                  <Input placeholder="Enter company name" id="companyName" {...register("companyName")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.companyName?.message}</p>
                </div>
                <div className={cn("space-y-2", isCurrent && "col-span-2")}>
                  <Label htmlFor="startDate" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.startDate && "text-destructive"
                  )}>Start date</Label>
                  <Input type="date" id="startDate" {...register("startDate")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.startDate?.message}</p>
                </div>
                <>
                  {
                    !isCurrent &&
                    <div className="space-y-2">
                      <Label htmlFor="endYear" className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        formErrors.endDate && "text-destructive"
                      )}>End date</Label>
                      <Input type="date" id="endDate" {...register("endDate")} />
                      <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.endDate?.message}</p>
                    </div>
                  }
                </>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="role" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.role && "text-destructive"
                  )}>Role</Label>
                  <Input placeholder="Enter school location" id="role" {...register("role")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.role?.message}</p>
                </div>
                <div className="space-y-2 w-full col-span-2">
                  <Label htmlFor="summary" className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    formErrors.summary && "text-destructive"
                  )}>Job Summary</Label>
                  <Textarea placeholder="Job summary" id="summary" {...register("summary")} />
                  <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.summary?.message}</p>
                </div>
                <div className="space-y-2 w-full col-span-2">
                  <Label className="flex gap-2 items-center" htmlFor="isCurrent">
                    <Checkbox
                      name="isCurrent"
                      className="w-5 h-5"
                      id="isCurrent"
                      onCheckedChange={checked => {
                        if (checked) {
                          setIsCurrent(true);
                          setValue("isCurrent", true);
                          setValue("endDate", new Date());
                          return;
                        }
                        setValue("isCurrent", false);
                        setIsCurrent(false);
                      }}
                    />
                    <span className="cursor-pointer">
                      Current employment
                    </span>
                  </Label>
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

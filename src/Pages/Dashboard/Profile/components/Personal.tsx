import React from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast';
import { Camera, Loader } from 'lucide-react';
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { IPersonalInfo } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countriess';

export const Personal = () => {
  const toast = useToast().toast;
  console.log({ countries});
  const schema = yup.object().shape({
    picture: yup.string().required("Profile picture is required"),
    title: yup.string().required("Title is required"),
    lastname: yup.string().required("Surname is required"),
    firstname: yup.string().required("First name is required"),
    middlename: yup.string().required("Middle name is required"),
    email: yup.string().required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    gender: yup.string().required("Gender is required"),
    nationality: yup.string().required("Required"),
    address: yup.string().required("Address is required"),
    emergencyContactName: yup.string().required("Required"),
    emergencyContactEmail: yup.string().required("Required"),
    emergencyContactPhone: yup.string().required("Required")
  });
  const form = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit, register, setValue, watch, formState: { errors: formErrors } } = form;
  const [loading, setLoading] = React.useState<boolean>(false);
  const submit: SubmitHandler<IPersonalInfo> = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("form");
      setLoading(false);
    }, 2000);
  }

  const onFileDrop = React.useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size / 1000 > 1000) {
        toast({
          title: "File too large",
          description: "Please upload a file below 1mb",
          variant: "destructive"
        })
        return;
      }

      if (
        file.name.toLowerCase().endsWith(".jpg") ||
        file.name.toLowerCase().endsWith(".jpeg") ||
        file.name.toLowerCase().endsWith(".png") ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        const res = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

        const response = await res as string;
        setValue("picture", response);
        return;
      }
      toast({
        title: "Incorrect file format",
        description: "Please upload only a .png or .jpeg file",
        variant: "destructive"
      })
      return;
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='mt-8 w-full'>
      <form onSubmit={handleSubmit(submit)}>
        <div className='mb-8'>
          <div className='w-40 aspect-square relative'>
            <img src={watch("picture") ?? "/placeholder.jpeg"} alt="profile picture" className='max-w-full shadow-md' />
            <Input {...register("picture", {
              onChange: e => onFileDrop(e.target.files)
            })} type="file" accept='.jpeg, .jpg, .png, .webp' id="profile-picture" className='hidden' />
            <Label className='bg-primary inline-block p-3 rounded-full absolute -right-5 -bottom-4 cursor-pointer hover:bg-primary/80 transition-all duration-200' htmlFor='profile-picture'><Camera className='text-white' /></Label>
          </div>
          <p className="text-xs font-medium mt-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.picture?.message}</p>
        </div>
        <div className='sm:grid sm:gap-4'>
          <div className="space-y-2">
            <Label htmlFor="title" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.title && "text-destructive"
            )}>Title</Label>
            <Input placeholder="Enter title" id="title" {...register("title")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.title?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.lastname && "text-destructive"
            )}>Surname</Label>
            <Input placeholder="Enter surname" id="lastname" {...register("lastname")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.lastname?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstname" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.firstname && "text-destructive"
            )}>First Name</Label>
            <Input placeholder="Enter first name" id="firstname" {...register("firstname")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.firstname?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="middlename" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.middlename && "text-destructive"
            )}>Middle Name</Label>
            <Input placeholder="Enter middle name" id="middlename" {...register("middlename")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.middlename?.message}</p>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="email" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.email && "text-destructive"
            )}>Email address</Label>
            <Input placeholder="Enter personal email address" id="email" {...register("email")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.email?.message}</p>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="phone" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.phone && "text-destructive"
            )}>Phone</Label>
            <Input placeholder="Enter phone number" id="phone" {...register("phone")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.phone?.message}</p>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="gender" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.gender && "text-destructive"
            )}>Gender</Label>
            <Select {...register("gender")} onValueChange={(e) => setValue("gender", e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F">Female</SelectItem>
                <SelectItem value="M">Male</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.gender?.message}</p>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="nationality" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.nationality && "text-destructive"
            )}>Nationality</Label>
            <Select {...register("nationality")} onValueChange={(e) => setValue("nationality", e)}>
              <SelectTrigger>
                <SelectValue placeholder={countries && "Select country"} />
              </SelectTrigger>
                <SelectContent>
                  {countries.map(item => <SelectItem key={item.label} value={item.label}>{item.label}</SelectItem>)}
                </SelectContent>
            </Select>
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.nationality?.message}</p>
          </div>
          <div className="space-y-2 w-full col-span-2">
            <Label htmlFor="address" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.address && "text-destructive"
            )}>Address</Label>
            <Textarea placeholder="Address" id="email" {...register("address")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.address?.message}</p>
          </div>

          {/* emergency contact */}
          <div className='col-span-2'>
            <h3 className='text-sm uppercase font-semibold mt-4 text-slate-500'>Emergency Contact</h3>
          </div>
          <div className="space-y-2 w-full col-span-2">
            <Label htmlFor="emergencyContactName" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.emergencyContactName && "text-destructive"
            )}>Full Name</Label>
            <Input placeholder="Contact full name" id="emergencyContactName" {...register("emergencyContactName")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.emergencyContactName?.message}</p>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="emergencyContactPhone" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.emergencyContactPhone && "text-destructive"
            )}>Contact Phone</Label>
            <Input placeholder="Contact phone number" id="emergencyContactPhone" {...register("emergencyContactPhone")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.emergencyContactPhone?.message}</p>
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="emergencyContactEmail" className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              formErrors.emergencyContactEmail && "text-destructive"
            )}>Email Address</Label>
            <Input placeholder="Contact email" id="emergencyContactEmail" {...register("emergencyContactEmail")} />
            <p className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive">{formErrors.emergencyContactEmail?.message}</p>
          </div>
          <div className='col-span-2 mt-4'>
            <Button className='w-28' disabled={loading}>{loading ? <Loader className='animate-spin' /> : "Submit"}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

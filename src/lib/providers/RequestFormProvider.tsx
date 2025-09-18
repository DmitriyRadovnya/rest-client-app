'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { FC, PropsWithChildren, useEffect } from 'react';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';

interface RequestFormProviderProps extends PropsWithChildren {
  initial: UserRequest;
}

const RequestFormProvider: FC<RequestFormProviderProps> = ({
  initial,
  children,
}) => {
  const methods = useForm<UserRequest>({ defaultValues: initial });
  const { reset } = methods;
  useEffect(() => {
    reset(initial);
  }, [initial, reset]);
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default RequestFormProvider;

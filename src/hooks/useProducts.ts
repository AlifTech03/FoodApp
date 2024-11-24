import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";
import { TablesInsert, TablesUpdate } from "../database.types";

export const useProductList = () => {
    return useQuery({
        queryKey: ['product_key'],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}

export const useProduct = (id?: number) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*').eq('id', id!).single()
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useInsertproduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({name, price, image}: TablesInsert<'products'>) => {
            const { data: newProduct, error } = await supabase.from("products").insert({
                name: name,
                price: price,
                image: image
            })
            if (error) {
                throw new Error(error.message)
            }
            return newProduct
        }, onSuccess: async () => {
            await queryClient.invalidateQueries(['product_key'])
        }
    })
}


export const useUpdateproduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...update }: TablesUpdate<'products'>) => {
            console.log({update});
            
            const { data: updateProduct, error } = await supabase.from("products").update(update).eq('id', id!).select().single()
            if (error) {
                throw new Error(error.message)
            }
            return updateProduct
        }, onSuccess: async (_, { id }) => {
            await queryClient.invalidateQueries(['product_key'])
            await queryClient.invalidateQueries(["product", id!])
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id?: number) => {
            const { error } = await supabase.from('products').delete().eq('id', id!)
            if (error) {
                throw new Error(error.message)
            }
        }, onSuccess: async () => {
            await queryClient.invalidateQueries(['product_key'])
        }
    })
}
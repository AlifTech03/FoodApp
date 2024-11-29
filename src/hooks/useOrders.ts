import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "../utils/supabase"
import { OrderStatus } from "../constants/types"
import { useAuth } from "../providers/AuthProvider"
import { TablesInsert, TablesUpdate } from "../database.types"

export const useAdminOrder = ({ archieve = false }: { archieve: boolean }) => {
    const status: OrderStatus[] = archieve ? ["Delivered"] : ["Cooking", "New", "Delivering"]
    return useQuery({
        queryKey: [
            "orders", archieve
        ],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').in("status", status).order('id', { ascending: false })
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

export const useMyorder = () => {
    const { session } = useAuth()
    const id = session?.user.id
    return useQuery({
        queryKey: ["order", { userId: id }],
        queryFn: async () => {
            if (!id) return null
            const { data, error } = await supabase.from('orders').select('*').eq('user_id', id).order('id', { ascending: false })
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}

export const useOrderDetails = (id?: number) => {
    return useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const { data, error } = await supabase.from("orders").select("*, order_item(*, products(*))").eq("id", id!).single()
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}
export const useOrderItems = (id?: number) => {
    return useQuery({
        queryKey: ["orderItem", id],
        queryFn: async () => {
            const { data, error } = await supabase.from("orders").select("*").eq("order_id", id!).single()
            if (error) {
                throw new Error(error.message)
            }
            return data
        }
    })
}


export const userCreateOrder = () => {
    const queryClient = useQueryClient()
    const { session } = useAuth()
    const userId = session?.user.id
    return useMutation({
        mutationFn: async (data: TablesInsert<'orders'>) => {
            const { data: newOrder, error } = await supabase.from('orders').insert({ ...data, user_id: userId }).select().single()
            if (error) {
                throw new Error(error.message)
            }
            return newOrder
        }, onSuccess: async (_, {id}) => {
            await queryClient.invalidateQueries( ["order", id])
            await queryClient.invalidateQueries( ["order", { userId: userId }])
            
        }
    })
}

export const useCreateOrderItem = () => {
    return useMutation({
        mutationFn: async (data: TablesInsert<'order_item'>[]) => {
            const { data: orderedItems, error } = await supabase.from('order_item').insert(data).select()
            if (error) {
                throw new Error(error.message)
            }
            return orderedItems
        }
    })
}
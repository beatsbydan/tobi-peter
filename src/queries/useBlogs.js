import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as blogsApi from '../api/blogs'

export const blogsKeys = {
  all: ['blogs'],
  list: () => [...blogsKeys.all, 'list'],
  detail: (id) => [...blogsKeys.all, 'detail', id],
}

export function useBlogsQuery() {
  return useQuery({ queryKey: blogsKeys.list(), queryFn: blogsApi.getBlogs })
}

export function useBlogQuery(id) {
  return useQuery({
    queryKey: blogsKeys.detail(id),
    queryFn: () => blogsApi.getBlog(id),
    enabled: Boolean(id),
  })
}

function useInvalidateBlogs() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: blogsKeys.all })
}

export function useCreateBlogMutation() {
  const invalidateBlogs = useInvalidateBlogs()
  return useMutation({
    mutationFn: blogsApi.createBlog,
    onSuccess: invalidateBlogs,
  })
}

export function useUpdateBlogMutation() {
  const invalidateBlogs = useInvalidateBlogs()
  return useMutation({
    mutationFn: ({ id, blog }) => blogsApi.updateBlog(id, blog),
    onSuccess: invalidateBlogs,
  })
}

export function useDeleteBlogMutation() {
  const invalidateBlogs = useInvalidateBlogs()
  return useMutation({
    mutationFn: blogsApi.deleteBlog,
    onSuccess: invalidateBlogs,
  })
}

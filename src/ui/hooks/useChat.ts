import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { chatRepository } from "../di";
import { 
  GetConversations, 
  GetConversationById, 
  StartConversation 
} from "../../domain/chat/usecases/ConversationUseCases";
import { 
  GetMessages, 
  SendMessage, 
  MarkMessagesAsRead 
} from "../../domain/chat/usecases/MessageUseCases";
import { SendMessagePayload } from "../../domain/chat/entities/Message";

// Use case instances
const getConversationsUseCase = new GetConversations(chatRepository);
const getConversationByIdUseCase = new GetConversationById(chatRepository);
const startConversationUseCase = new StartConversation(chatRepository);
const getMessagesUseCase = new GetMessages(chatRepository);
const sendMessageUseCase = new SendMessage(chatRepository);
const markMessagesAsReadUseCase = new MarkMessagesAsRead(chatRepository);

// Query hooks
export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversationsUseCase.execute(),
  });
};

export const useConversation = (conversationId: number) => {
  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversationByIdUseCase.execute(conversationId),
    enabled: !!conversationId,
  });
};

export const useMessages = (conversationId: number) => {
  return useInfiniteQuery({
    queryKey: ["messages", conversationId],
    queryFn: ({ pageParam = 1 }) => getMessagesUseCase.execute(conversationId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.has_more) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: conversationId > 0,
  });
};

// Mutation hooks
export const useStartConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => startConversationUseCase.execute(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessageUseCase.execute(payload),
    onSuccess: (data, variables) => {
      // Invalidate messages for the conversation
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      // Also invalidate conversations list to update last message
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, messageIds }: { conversationId: number; messageIds: number[] }) =>
      markMessagesAsReadUseCase.execute(conversationId, messageIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

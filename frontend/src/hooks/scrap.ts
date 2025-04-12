import { scrapAction } from "@/api/scrap";
import { useMutation } from "@tanstack/react-query";

export function useInitiateScrap() {
  return useMutation({
    mutationFn: (values: any) => scrapAction.scrapReq(values),
  });
}

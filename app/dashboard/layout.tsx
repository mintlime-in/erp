"use client";

import { Box, ClientOnly, Flex, Skeleton, Stack } from "@chakra-ui/react";
import {
  ColorModeButton,
  useColorModeValue,
} from "../components/ui/color-mode";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly fallback={<Skeleton height="100vh" />}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Logo</Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spaceX={7}>
              <ColorModeButton />
            </Stack>
          </Flex>
        </Flex>
      </Box>
      {children}
    </ClientOnly>
  );
}

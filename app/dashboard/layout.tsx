"use client";

import {
  Avatar,
  Box,
  Button,
  ClientOnly,
  Flex,
  HStack,
  IconButton,
  Menu,
  Portal,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiBell, FiChevronDown } from "react-icons/fi";
import {
  ColorModeButton,
  useColorModeValue,
} from "../components/ui/color-mode";
import SideBar from "./sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  return (
    <ClientOnly fallback={<Skeleton height="100vh" />}>
      <TopBar session={session.data as Session} />
      <Box p={1} minH="100vh" bg={useColorModeValue("#EDF2F7", "gray.900")}>
        {children}
      </Box>
    </ClientOnly>
  );
}

function TopBar({ session }: { session: Session | null }) {
  return (
    <Box bg={"#034F75"}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <SideBar />
        <Flex alignItems={"center"}>
          <HStack>
            <ColorModeButton color="white" />
            {/* {session && <NotificationMenu x session={session} />} */}
            {session && <ProfileMenu session={session} />}
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}

function ProfileMenu({ session }: { session: Session }) {
  const router = useRouter();
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="ghost" size="md">
          <HStack>
            <Avatar.Root size="xs">
              <Avatar.Fallback />
              <Avatar.Image src={session?.user?.image as string} />
            </Avatar.Root>
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              gap={0}
            >
              <Text fontSize="sm" color="white">
                {session?.user?.name}
              </Text>
              <Text fontSize="xs" color="white">
                {session?.user?.userid}
              </Text>
            </VStack>
          </HStack>
          <Box display={{ base: "none", md: "flex" }} color="white">
            <FiChevronDown />
          </Box>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              value="profile"
              onSelect={() => router.push("/dashboard/profile")}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              value="logout"
              onSelect={() => router.push("/api/auth/signout")}
            >
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function NotificationMenu({ session }: { session: Session }) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton size="lg" variant="ghost">
          <FiBell />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {[1, 2, 3].map((d) => {
              return (
                <Menu.Item key={d} value="notification" w="300px">
                  <VStack alignItems="flex-start" gap={0}>
                    <Text fontSize="sm">Notification {d}</Text>
                    <Text fontSize="xs">New Notification</Text>
                  </VStack>
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

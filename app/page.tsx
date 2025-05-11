"use client";

import {
  Button,
  Center,
  ClientOnly,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <ClientOnly fallback={<Skeleton height="100vh" />}>
      {session.status === "loading" ? (
        <Skeleton height="100vh" />
      ) : (
        <Center>
          {session.status === "unauthenticated" && (
            <VStack>
              <Text fontSize="md">You are not logged in.</Text>
              <Button
                onClick={() => {
                  window.location.href = "/api/auth/signin";
                }}
              >
                Sign In
              </Button>
            </VStack>
          )}
          {session.status === "authenticated" && (
            <VStack>
              <Text fontSize="lg">Welcome {session.data?.user?.name}</Text>
              <Button
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                Dashboard
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/api/auth/signout";
                }}
              >
                Sign Out
              </Button>
            </VStack>
          )}
        </Center>
      )}
    </ClientOnly>
  );
}

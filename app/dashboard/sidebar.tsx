import {
  Accordion,
  Button,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Image,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { RefObject, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { navList } from "../routes";
import { useSession } from "next-auth/react";

export default function SideBar() {
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <Drawer.Root placement="start">
      <Drawer.Trigger asChild>
        <IconButton variant="ghost" color="white">
          <FiMenu />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Positioner w={"250px"}>
          <Drawer.Content backgroundColor={"#034F75"}>
            <Drawer.Header>
              <Drawer.Title>
                <HStack gap="5">
                  <Image src="/api/images?name=logo-min.png" height="60px" />
                  <Text fontSize="xl" color={"white"}>
                    SRMVCAS
                  </Text>
                </HStack>
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <SideNavContent closeRef={closeRef} />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton ref={closeRef} size="sm" color={"white"} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

interface SideNavContentProps {
  closeRef: RefObject<HTMLButtonElement | null>;
}

function SideNavContent({ closeRef }: SideNavContentProps) {
  const session = useSession();
  let roles = session.data?.user.roles || [];
  const router = useRouter();

  function navigate(path: string) {
    router.push(path);
    closeRef.current?.click();
  }

  return (
    <Accordion.Root
      multiple
      defaultValue={navList.map((d) => d.title)}
      variant="plain"
    >
      {navList.map((item, index) => (
        <Accordion.Item key={index} value={item.title}>
          <Accordion.ItemTrigger>
            <Text
              fontSize="md"
              color={"white"}
              flex="1"
              className="cursor-pointer"
            >
              {item.title}
            </Text>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody py="0">
              <VStack gap="0">
                {item.items
                  .filter((sumitem) => {
                    if (roles.includes("admin")) return true;
                    if (sumitem.roles) {
                      return sumitem.roles.some((role) => roles.includes(role));
                    }
                    return true;
                  })
                  .map((subItem, subIndex) => (
                    <Button
                      key={subIndex}
                      variant="ghost"
                      color="white"
                      _hover={{ bg: "#01273b" }}
                      onClick={() => navigate(subItem.link)}
                      w="100%"
                      justifyContent="flex-start"
                    >
                      {subItem.text}
                    </Button>
                  ))}
              </VStack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

import React, { useState } from "react";
import { 
  FiChevronsRight,
  FiCreditCard,
  FiDollarSign,
  FiHome,
  FiList, 
  FiSettings
} from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "~/firebase";
import type { User } from "firebase/auth";
import { Loading } from "~/components/loading";
import { useRouter, type NextRouter } from "next/router";
import Head from "next/head";

export const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user,loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = router.pathname; 
  let _title = pathname.split("/")?.slice(-1)?.[0]?.replace(/-/g, " ") ?? "Dashboard";
  _title = _title === "[id]" ? "Match Details" : _title;
  const titleWithCapitalization = _title.charAt(0).toUpperCase() + _title.slice(1); 
  if (loading) return <Loading />; 
  if(!user) {
    router.push("/sign-in").then(() => {
      console.log("Redirected to login page");
    }).catch((err) => {
      console.error("Failed to redirect to login page:", err);
    });  
    return null;
  }
  
  return (
    <>
      <Head>
        <title>{titleWithCapitalization ?? "Dashboard"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex bg-indigo-50">
        <Sidebar user={user ?? null} router={router} selected={pathname} />
        <div className="w-full transition-all">
          {children}
        </div>
      </div>
    </>
  );
};

const Sidebar: React.FC<{user: User | null, router: NextRouter, selected: string}> = ({user, router, selected}) => {
  const [open, setOpen] = useState(true); 

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} user={user} />
      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected === "/dashboard"}
          setSelected={async () => await router.push("/dashboard")}
          open={open}
        />
        <Option
          Icon={FaMagnifyingGlass}
          title="Chat"
          selected={selected === "/dashboard/chat"}
          setSelected={async () => await router.push("/dashboard/chat")}
          open={open} 
        />
        <Option
          Icon={FiList}
          title="Match History"
          selected={selected === "/dashboard/match-history"}
          setSelected={async () => await router.push("/dashboard/match-history")}
          open={open}
        />
        <Option
          Icon={FiDollarSign}
          title="Billing"
          selected={selected === "/dashboard/billing"}
          setSelected={async () => await router.push("/dashboard/billing")}
          open={open}
        />
        <Option
          Icon={FiCreditCard}
          title="Paymets"
          selected={selected === "/dashboard/payments"}
          setSelected={async () => await router.push("/dashboard/payments")}
          open={open}
        />
        <Option
          Icon={FiSettings}
          title="Settings"
          selected={selected === "/dashboard/settings"} 
          setSelected={async () => await router.push("/dashboard/settings")}
          open={open}
        />
      </div>
      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option: React.FC<{
        Icon: React.ElementType;
        title: string;
        selected: boolean;
        setSelected: () => Promise<boolean>;
        open: boolean;
        notifs?: number;
}> = ({ Icon, title, selected, setSelected, open, notifs }) => {
  return (
    <motion.button
      layout
      onClick={async () => await setSelected()}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors cursor-pointer ${selected ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection: React.FC<{open: boolean, user: User | null}> = ({ open, user }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">{user?.displayName ?? "Brewmaster"}</span>
              <span className="block text-xs text-slate-500">{user?.email}</span>
            </motion.div>
          )}
        </div> 
      </div>
    </div>
  );
};

const Logo = () => { 
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-black"
    >
      <img src="/brew.png" alt="Logo" className="h-10 w-10 rounded-md" />
    </motion.div>
  );
};

const ToggleClose: React.FC<{open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}> = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100 cursor-pointer"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};


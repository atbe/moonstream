import React, { useState, useContext, useEffect } from "react";
import { useBoolean, useBreakpointValue } from "@chakra-ui/react";
import { useStorage, useQuery, useRouter } from "../../hooks";
import UIContext from "./context";
import UserContext from "../UserProvider/context";
import ModalContext from "../ModalProvider/context";
import { v4 as uuid4 } from "uuid";

const UIProvider = ({ children }) => {
  const router = useRouter();
  const { user, isInit } = useContext(UserContext);
  const isMobileView = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
  });

  const currentBreakpoint = useBreakpointValue({
    base: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    "2xl": 5,
  });

  const { modal, toggleModal } = useContext(ModalContext);
  const [searchTerm, setSearchTerm] = useQuery("q", " ", true, false);

  const [searchBarActive, setSearchBarActive] = useState(false);

  // ****** Session state *****
  // Whether sidebar should be toggled in mobile view
  const [sessionId] = useStorage(window.sessionStorage, "sessionID", uuid4());

  // ******* APP state ********
  const [isLoggedIn, setLoggedIn] = useState(user && user.username);
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [isAppReady, setAppReady] = useState(false);
  const [isAppView, setAppView] = useState(
    router.nextRouter.asPath.includes("/stream") ||
      router.nextRouter.asPath.includes("/account") ||
      router.nextRouter.asPath.includes("/subscriptions") ||
      router.nextRouter.asPath.includes("/analytics")
  );

  useEffect(() => {
    if (isAppView && isAppReady && !user?.username && !isLoggingOut) {
      // toggleModal("login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppView, isAppReady, user, isLoggingOut]);

  useEffect(() => {
    if (isLoggingOut && !isAppView && user) {
      setLoggingOut(false);
    }
  }, [isAppView, user, isLoggingOut]);

  useEffect(() => {
    if (isInit && router.nextRouter.isReady) {
      setAppReady(true);
    } else {
      setAppReady(false);
    }
  }, [isInit, router]);

  useEffect(() => {
    if (user && user.username) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    setAppView(
      router.nextRouter.asPath.includes("/stream") ||
        router.nextRouter.asPath.includes("/account") ||
        router.nextRouter.asPath.includes("/subscriptions") ||
        router.nextRouter.asPath.includes("/analytics")
    );
  }, [router.nextRouter.asPath, user]);

  // *********** Sidebar states **********************

  // Whether sidebar should be visible at all or hidden
  const [sidebarVisible, setSidebarVisible] = useStorage(
    window.sessionStorage,
    "sidebarVisible",
    true
  );
  // Whether sidebar should be smaller state
  const [sidebarCollapsed, setSidebarCollapsed] = useStorage(
    window.sessionStorage,
    "sidebarCollapsed",
    false
  );

  // Whether sidebar should be toggled in mobile view
  const [sidebarToggled, setSidebarToggled] = useStorage(
    window.sessionStorage,
    "sidebarToggled",
    false
  );

  //Sidebar is visible at all times in mobile view
  useEffect(() => {
    if (isMobileView) {
      setSidebarVisible(true);
      setSidebarCollapsed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileView]);

  //Sidebar is visible at at breakpoint value less then 2
  //Sidebar is visible always in appView
  useEffect(() => {
    if (currentBreakpoint < 2) {
      setSidebarVisible(true);
      setSidebarCollapsed(false);
    } else {
      if (!isAppView) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBreakpoint, isAppView]);

  // *********** Entries layout states **********************

  //
  // const [entryId, setEntryId] = useState();
  // Current transaction to show in sideview
  const [currentTransaction, _setCurrentTransaction] = useState(undefined);
  const [isEntryDetailView, setEntryDetailView] = useState(false);

  const setCurrentTransaction = (tx) => {
    _setCurrentTransaction(tx);
    setEntryDetailView(!!tx);
  };

  /**
   * States that entries list box should be expanded
   * Default true in mobile mode and false in desktop mode
   */
  const [entriesViewMode, setEntriesViewMode] = useState(
    isMobileView ? "list" : "split"
  );

  useEffect(() => {
    setEntriesViewMode(
      isMobileView ? (isEntryDetailView ? "entry" : "list") : "split"
    );
  }, [isEntryDetailView, isMobileView]);

  // *********** onboarding UI **********************

  const [showPopOvers, setShowPopOvers] = useBoolean(false);

  // **********************************************
  return (
    <UIContext.Provider
      value={{
        sidebarVisible,
        setSidebarVisible,
        searchBarActive,
        setSearchBarActive,
        isMobileView,
        sidebarCollapsed,
        setSidebarCollapsed,
        sidebarToggled,
        setSidebarToggled,
        searchTerm,
        setSearchTerm,
        isAppView,
        setAppView,
        setLoggingOut,
        isLoggedIn,
        isAppReady,
        entriesViewMode,
        setEntryDetailView,
        modal,
        toggleModal,
        sessionId,
        currentTransaction,
        setCurrentTransaction,
        isEntryDetailView,
        showPopOvers,
        setShowPopOvers,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;

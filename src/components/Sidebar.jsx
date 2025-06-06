import React from "react";
import SidebarIcon from "./SidebarIcon";

// React Icon
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router";

function Sidebar() {
  return (
    <section className="sidebar-section">
      <div className="sidebar-content flex flex-col gap-3  text-white">
        <Link to={"/"}>
          <SidebarIcon
            active={true}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                height={24}
                viewBox="0 0 24 24"
                width={24}
                focusable="false"
                aria-hidden="true"
                style={{
                  pointerEvents: "none",
                  display: "inherit",
                }}
              >
                <path
                  clip-rule="evenodd"
                  d="M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5H14v-8h-4v8H5.5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146Z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            }
            title="Home"
          />
        </Link>
        <SidebarIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height={24}
              viewBox="0 0 24 24"
              width={24}
              focusable="false"
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                display: "inherit",
              }}
            >
              <path
                clip-rule="evenodd"
                d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          }
          title="Shorts"
        />
        <SidebarIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height={24}
              viewBox="0 0 24 24"
              width={24}
              focusable="false"
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                display: "inherit",
              }}
            >
              <path
                clip-rule="evenodd"
                d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          }
          title="Subscriptions"
        />
        <SidebarIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height={24}
              viewBox="0 0 24 24"
              width={24}
              focusable="false"
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                display: "inherit",
              }}
            >
              <path
                clip-rule="evenodd"
                d="M12 20.5c1.894 0 3.643-.62 5.055-1.666a5.5 5.5 0 00-10.064-.105.755.755 0 01-.054.099A8.462 8.462 0 0012 20.5Zm4.079-5.189a7 7 0 012.142 2.48 8.5 8.5 0 10-12.443 0 7 7 0 0110.3-2.48ZM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm2-12.5a2 2 0 11-4 0 2 2 0 014 0Zm1.5 0a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          }
          title="You"
        />
        <SidebarIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height={24}
              viewBox="0 0 24 24"
              width={24}
              focusable="false"
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                display: "inherit",
              }}
            >
              <path
                clip-rule="evenodd"
                d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          }
          title="History"
        />
        <Link to={"/likes"}>
          <SidebarIcon icon={<AiOutlineLike />} title="Liked Video" />
        </Link>
      </div>
    </section>
  );
}

export default Sidebar;

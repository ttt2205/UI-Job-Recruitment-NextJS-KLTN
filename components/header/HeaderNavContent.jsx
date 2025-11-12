"use client";

import Link from "next/link";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const HeaderNavContent = () => {
  const pathname = usePathname();
  const { account } = useSelector((state) => state.auth);

  // ========================= State ======================/
  const isFullMenuEmployer =
    account?.role &&
    (account.role === process.env.NEXT_PUBLIC_USER_ROLE_EMPLOYER ||
      account.role === process.env.NEXT_PUBLIC_USER_ROLE_ADMIN);

  const isFullMenuCandidate =
    account?.role &&
    (account.role === process.env.NEXT_PUBLIC_USER_ROLE_CANDIDATE ||
      account.role === process.env.NEXT_PUBLIC_USER_ROLE_ADMIN);

  // ========================= Render UI ======================/
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li
            className={`${
              isActiveParent(homeItems, pathname) ? "current" : ""
            } dropdown`}
          >
            {/* Home Tag */}
            <Link href="/home-10">Home</Link>
            {/* <span>Home</span> */}
            {/* <div className="mega-menu">
              <div className="mega-menu-bar row pt-0">
                {homeItems.map((item) => (
                  <div
                    className="column col-lg-3 col-md-3 col-sm-12"
                    key={item.id}
                  >
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, pathname)
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link href={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div> */}
          </li>
          {/* End homepage menu items */}

          <li
            className={`${
              isActiveParent(findJobItems, pathname) ? "current" : ""
            } dropdown has-mega-menu`}
            id="has-mega-menu"
          >
            <Link href="/job-list-v10">Find Jobs</Link>
            {/* <span>Find Jobs</span>
            <div className="mega-menu">
              <div className="mega-menu-bar row">
                {findJobItems.map((item) => (
                  <div
                    className="column col-lg-3 col-md-3 col-sm-12"
                    key={item.id}
                  >
                    <h3>{item.title}</h3>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, pathname)
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link href={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div> */}
          </li>
          {/* End findjobs menu items */}

          {isFullMenuEmployer ? (
            <li
              className={`${
                isFullMenuEmployer &&
                (isActiveParent(employerItems, pathname) ||
                  pathname.split("/")[1] === "employers-dashboard")
                  ? "current"
                  : ""
              } dropdown`}
            >
              <span>Employers</span>
              <ul>
                {/* {employerItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, pathname)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))} */}
                <li
                  className={
                    usePathname()?.includes("/employers-list-v2")
                      ? "current"
                      : ""
                  }
                >
                  <Link href="/employers-list-v2">Employers List</Link>
                </li>

                <li
                  className={
                    usePathname()?.includes("/employers-dashboard")
                      ? "current"
                      : ""
                  }
                >
                  <Link href="/employers-dashboard/dashboard">
                    Employers Dashboard
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li
              className={`${
                isActiveParent(employerItems, pathname) ||
                usePathname()?.split("/")[1] === "employers-dashboard"
                  ? "current"
                  : ""
              } dropdown`}
            >
              <Link href="/employers-list-v2">Employers List</Link>
            </li>
          )}
          {/* End Employers menu items */}

          {isFullMenuCandidate ? (
            <li
              className={`${
                isFullMenuCandidate &&
                (isActiveParent(candidateItems, pathname) ||
                  pathname.split("/")[1] === "candidates-dashboard")
                  ? "current"
                  : ""
              } dropdown`}
            >
              <span>Candidates</span>
              <ul>
                {/* {candidateItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, pathname)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))} */}
                <li
                  className={
                    usePathname()?.includes("/candidates-list-v3")
                      ? "current"
                      : ""
                  }
                >
                  <Link href="/candidates-list-v3">Candidates List</Link>
                </li>

                <li
                  className={
                    usePathname()?.includes("/candidates-dashboard/")
                      ? "current"
                      : ""
                  }
                >
                  <Link href="/candidates-dashboard/dashboard">
                    Candidates Dashboard
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li
              className={`${
                isActiveParent(candidateItems, pathname) ||
                usePathname()?.split("/")[1] === "candidates-dashboard"
                  ? "current"
                  : ""
                  ? "current"
                  : ""
              } dropdown`}
            >
              <Link href="/candidates-list-v3">Candidates List</Link>
            </li>
          )}
          {/* End Candidates menu items */}

          {/* <li
            className={`${
              isActiveParentChaild(blogItems, pathname) ? "current" : ""
            } dropdown`}
          >
            <span>Blog</span>
            <ul>
              {blogItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, pathname) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          {/* End Blog menu items */}

          {/* <li
            className={`${
              isActiveParentChaild(pageItems, pathname) ||
              isActiveParentChaild(shopItems[0].items, pathname)
                ? "current "
                : ""
            } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {shopItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={`${
                      isActiveParentChaild(shopItems[0].items, pathname)
                        ? "current "
                        : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, pathname) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;

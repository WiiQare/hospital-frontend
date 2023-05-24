import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlinePersonOutline, MdMailOutline, MdQrCodeScanner } from "react-icons/md";
import {
	AiOutlineArrowRight,
	AiOutlineBell,
	AiOutlineMessage,
} from "react-icons/ai";
import {
	Box,
	Tooltip,
	IconButton,
	Avatar as AvatarMui,
	Menu as MenuMui,
	MenuItem
} from "@mui/material";
import { BsQrCodeScan } from "react-icons/bs";

import logo from "../../../public/images/favicon.png";
import logoDark from "../../../public/images/logo_dark_2.png";
import avatar from "../../../public/images/avatar.jpg";
import IconBadge from "../../atoms/Icons/Badge";
import NotificationBadge from "../../atoms/Card/Notifications/Badge";
import { useState } from "react";
import { signOut } from "next-auth/react"


const langFlags = {
	gb: "https://flagcdn.com/60x45/gb.png",
	fr: "https://flagcdn.com/60x45/fr.png",
};

const Menu = ({ session, handleSignOut }) => {

	const [anchorEl, setAnchorEl] = useState(null);
	const [lang, setLang] = useState("fr");

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLangChange = (lang) => {
		setLang(lang);
		setAnchorEl(null);
	};

	return (
		<div className="flex gap-12 mx-auto items-center justify-between fixed top-0 bg-white py-4 px-4 md:px-14 shadow-sm w-full z-50">
			<div className="flex gap-16 items-center">
				<div className="flex gap-2 items-center">
					<Link href={"/"} legacyBehavior>
						<Image
							src={logo}
							className="h-8 md:h-14 w-min object-left object-contain"
						/>
					</Link>
					<Link href={"/"} legacyBehavior>
						<Image
							src={logoDark}
							className="h-6 md:h-9 object-left object-contain w-min"
						/>
					</Link>
				</div>

			</div>

			<div className="flex items-center justify-between gap-8 md:gap-20">
				<div className="flex items-center md:gap-6">

					<div className="hidden md:flex">
						<Link href={"/scan"} legacyBehavior>
							<a>
								<MdQrCodeScanner size={30} className="text-gray-500 hover:text-gray-700" />
							</a>
						</Link>
					</div>

					<div className="">
						<Box>
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ ml: 2 }}
								aria-controls={open ? "account-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<AvatarMui
									// variant="square"
									sx={{ width: 24, height: 24 }}
									src={langFlags[lang]}
								/>
							</IconButton>
						</Box>
						<MenuMui
							anchorEl={anchorEl}
							id="account-menu"
							open={open}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									mt: 1.5,
									"& .MuiAvatar-root": {
										width: 24,
										height: 24,
										ml: -0.5,
										mr: 1,
									},
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<MenuItem onClick={() => handleLangChange("fr")}>
								<AvatarMui
									// variant="square"
									sx={{ width: 24, height: 24 }}
									src={langFlags.fr}
								/>
								{"   "}
								Français
							</MenuItem>
							<MenuItem onClick={() => handleLangChange("gb")}>
								<AvatarMui
									// variant="square"
									sx={{ width: 24, height: 24 }}
									src={langFlags.gb}
								/>
								{"   "}
								English
							</MenuItem>
						</MenuMui>
					</div>

					<div className="flex">
						<Dropdown
							arrowIcon={false}
							inline={true}
							className="shadow-sm rounded-2xl w-fit"
							label={
								<IconBadge total={2}>
									<AiOutlineBell size={25} />
								</IconBadge>
							}
						>
							<NotificationBadge
								avatar={avatar}
								time={"29 July 2020 - 02:26 PM"}
								title={"Dr sultads Send you Photo"}
							/>

							<NotificationBadge
								avatar={"https://via.placeholder.com/150"}
								time={"02 February 2023 - 1:43 PM"}
								title={"Bienvenu has received money from..."}
							/>

							<NotificationBadge
								avatar={avatar}
								time={"29 July 2020 - 02:26 PM"}
								title={"Dr sultads Send you Photo"}
							/>

							<Dropdown.Divider />

							<Dropdown.Item>
								<p className="text-center w-full flex items-center justify-center text-lg text-gray-500 font-light gap-2">
									Voir tous les notification
									<AiOutlineArrowRight />
								</p>
							</Dropdown.Item>
						</Dropdown>
					</div>

					

				</div>

				<div className="flex gap-3 items-center">
					<div className="text-right hidden md:block">
						<span>
							Bonjour 👋, <span className="font-bold">{session?.user?.data.names ?? session?.user?.data.name ?? "Ngaliema Center"}</span>
						</span>
						<h5 className="text-xs font-light">{session?.user?.email ?? `info@ngaliema-center.cd`}</h5>
					</div>
					<Dropdown
						arrowIcon={false}
						inline={true}
						className="shadow-sm rounded-2xl w-48"
						label={
							<Avatar
								alt="User settings"
								img={session?.user?.data.image ?? `https://ui-avatars.com/api/?uppercase=true&background=FE8023&name=${session?.user?.data.names ?? session?.user?.data.name ?? "Ngaliema Center"}&bold=true&color=FFF`}
								rounded={true}
								size={30}
								className="w-12 h-12"
							/>
						}
					>
						<Dropdown.Item>
							<Link href={"/profile"}>
								<span className="flex gap-3 text-lg items-center">
									<MdOutlinePersonOutline
										className="text-lg text-sky"
										size={23}
									/>
									<font>Profile</font>
								</span>
							</Link>
						</Dropdown.Item>
						<Dropdown.Item>
							<Link href={"/inbox"}>
								<span className="flex gap-3 text-lg items-center">
									<MdMailOutline className="text-lg text-green-500" size={23} />
									<font>Inbox</font>
								</span>
							</Link>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item>
							<button onClick={handleSignOut}>
								<span className="flex gap-3 text-lg items-center">
									<MdMailOutline className="text-lg text-red-500" size={23} />
									<font>Déconnexion</font>
								</span>
							</button>
						</Dropdown.Item>
					</Dropdown>
				</div>
			</div>
		</div>
	);
};

export default Menu;

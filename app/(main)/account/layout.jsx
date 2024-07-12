import { dbConnect } from "@/services/mongo";
import AccountSidebar from "./component/AccountSidebar";

async function Layout({ tabs }) {
	await dbConnect()
	return (
		<section className="relative pb-16">
			{/*end container*/}
			<div className="container relative mt-10">
				<div className="lg:flex">
					<AccountSidebar />
					<div className="lg:w-3/4 md:px-3 mt-[30px] lg:mt-0">
						{tabs}
					</div>
				</div>
				{/*end grid*/}
			</div>
			{/*end container*/}
		</section>
	);
}

export default Layout;

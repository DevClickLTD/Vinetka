import VignetteCheckerSidebar from "./VignetteCheckerSidebar";
import SidebarLatestPosts from "./SidebarLatestPosts";

export default function BlogSidebar({ currentPostSlug }) {
  return (
    <aside className="space-y-6">
      {/* Vignette Checker Section */}
      <VignetteCheckerSidebar />

      {/* Latest Posts Section */}
      <SidebarLatestPosts currentPostSlug={currentPostSlug} />
    </aside>
  );
}

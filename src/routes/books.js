import assignbooks from "../components/admin/books/assignbooks_template.vue";
import booksinventory from "../components/admin/books/booksinventory_template.vue";
import books from "../components/admin/books/booksmodule_template.vue";
import booksstatus from "../components/admin/books/booksstatus_template.vue";
import recommendedGroups from "../components/admin/books/books_recommended_groups.vue";
import bookslist from "../components/admin/books/books_template.vue";
import booksgenre from "../components/admin/books/book_genres.vue";
import book from "../components/admin/books/book_template.vue";
import recommendbook from "../components/admin/books/recommendbook_template.vue";

export default {
  path: "/books",
  component: books,
  children: [
    {
      path: "list",
      component: bookslist
    },
    {
      path: "book",
      component: book
    },
    {
      path: "recommendbook",
      component: recommendbook
    },
    {
      path: "booksstatus",
      component: booksstatus
    },
    {
      path: "booksinventory",
      component: booksinventory
    },
    {
      path: "assignbooks",
      component: assignbooks
    },
    {
      path: "booksgenre",
      component: booksgenre
    },
    {
      path: "recommendedGroups",
      component: recommendedGroups
    }
  ]
};

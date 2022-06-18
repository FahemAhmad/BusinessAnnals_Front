/* eslint-disable import/no-anonymous-default-export */
import httpService from "./httpService";
const users = "/user";
const journals = "/journal";
const chief = "/user/chief";
const notifications = "/notificaition";
const publisher = "/user/publisher";
const editor = "/user/editor";
const issue = "/issues";

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * All Users
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

//user Login
const userLogin = (values) => httpService.post(`${users}/login`, values);

//user SignUp
const createNewUser = (values) => httpService.post(`${users}/signup`, values);

//Activate User
const activateUser = (values) => httpService.post(`${users}/activate`, values);

//Forget User
const forgetUser = (values) => httpService.post(`${users}/forget`, values);

//Reset Password
const resetPassword = (values) => httpService.post(`${users}/reset`, values);

//get Bookmarks
const getBookmarks_User = (id) => httpService.get(`${users}/bookmark/${id}`);

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Cheif Editor
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

//get all journals
const getAllJournals = (postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${users}/chief/search/assigned?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

//get new submission
const newJournalSubmission = (postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${chief}/search/newSubmission?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

//get list of editors
const getEditors = () => httpService.get(`${chief}/getEditors`);

//post notifiacation
const postNotification = (values) =>
  httpService.post(`${chief}/notifications`, values);

//assign supervisor to the journal
const assignSupervisor = (id, value) =>
  httpService.put(
    `${chief}/allotSuperVisor/${id}`,
    { supervisor: value.supervisors, category: value.category },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

//chnage password
const changePassword = (id, values) =>
  httpService.put(`${chief}/changePassword/${id}`, values);

//Create Reviewer
const createReviewer = (values) =>
  httpService.post(`${chief}/reviewer`, values);

//get Chief Data
const getUserDetailsById = (id) => httpService.get(`${users}/chief/${id}`);

//Issue Launch
const launchIssue = (values) => httpService.put(`${chief}/issues`, values);

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Editors
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

//get EditorDetails
const getDetails_editor = (id) => httpService.get(`${editor}/${id}`);

//chnage password
const changePassword_editor = (id, values) =>
  httpService.put(`${editor}/changePassword/${id}`, values);

//update information
const updateInformtion_editor = (id, values) =>
  httpService.put(`${editor}/updateInfo/${id}`, values);

//get reviwed Content
const getReviwedContent_editor = (id, postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${editor}/reviewedJournals/${id}?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

//get assigned Content
const getAsssignedContent_editor = (id, postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${editor}/assignedJournals/${id}?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

//get notification
const getNotification_editor = (id, postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${editor}/notifications/${id}?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

//channge status
const changeStatus_editor = (id, value) =>
  httpService.put(`${editor}/set/${id}`, value);
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Publisher
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

//get Notifications

const getNotifications_publisher = (id, postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${publisher}/notifications/${id}?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

//getBookmarks
const getBookmarks_publisher = (id) =>
  httpService.get(`${publisher}/bookmarks/${id}`);

//add Bookmark
const addBookmark_publisher = (values) =>
  httpService.put(`${publisher}/bookmark`, values);

//remove Bookmark
const remBookmark_publisher = (values) =>
  httpService.put(`${publisher}/remBookmark`, values);

//get PublisherDetails
const getPublisherDetails = (id) => httpService.get(`${publisher}/${id}`);

//chnage password
const changePassword_Publisher = (id, values) =>
  httpService.put(`${publisher}/changePassword/${id}`, values);

//update information
const updateInformtion_publisher = (id, values) =>
  httpService.put(`${publisher}/updateInfo/${id}`, values);

//get Content
const getContent_publisher = (id, postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${publisher}/journals/${id}?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Journals
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

//get Current issues

const getCurrentIssues = (id, postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${journals}/currentIssues/${id}?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

const bestThreeJournals = () => httpService.get(`${journals}/latest`);
const searchJournals = ({ query, cancelToken }) =>
  httpService.get(`${journals}/search?q=${query}`, {
    cancelToken: cancelToken.token,
  });

//upload journals
const uploadJournals = (values, config) =>
  httpService.post(journals, values, config);

//download journals
const downloadJournal = (fileName) =>
  fetch(`http://localhost:5000/journal/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileName: fileName }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      console.log(blob);
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Journal.pdf`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Notifications
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

const getNotifications = (postsPerPage, indexOfLastPost) =>
  httpService.get(
    `${notifications}?limit=${postsPerPage}&start=${indexOfLastPost}`
  );

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Issue
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
//get Last Issue
const getLastIssue = () => httpService.get(`${issue}/last`);

//get all Issues
const getIssues = () => httpService.get(`${issue}/all`);

export default {
  userLogin,
  getUserDetailsById,
  searchJournals,
  bestThreeJournals,
  uploadJournals,
  downloadJournal,
  getAllJournals,
  newJournalSubmission,
  getEditors,
  assignSupervisor,
  postNotification,
  getNotifications,
  changePassword,
  createReviewer,
  getPublisherDetails,
  changePassword_Publisher,
  updateInformtion_publisher,
  getContent_publisher,
  getBookmarks_User,
  addBookmark_publisher,
  remBookmark_publisher,
  getBookmarks_publisher,
  getNotifications_publisher,
  getDetails_editor,
  updateInformtion_editor,
  changePassword_editor,
  getReviwedContent_editor,
  getAsssignedContent_editor,
  getNotification_editor,
  changeStatus_editor,
  getIssues,
  getCurrentIssues,
  getLastIssue,
  launchIssue,
  createNewUser,
  activateUser,
  forgetUser,
  resetPassword,
};

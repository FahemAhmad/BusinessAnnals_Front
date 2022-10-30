/* eslint-disable import/no-anonymous-default-export */
import httpService from "./httpService";
const users = "/user";
const journals = "/journal";
const chief = "/user/chief";
const notifications = "/notificaition";
const publisher = "/user/publisher";
const editor = "/user/editor";
const issue = "/issues";
const convo = "/conversation";
const message = "/messages";
// const message=

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

//all journals
const getJournals = () => httpService.get(`${chief}/all`);

//get all current journals
const getCurrentJournals = () => httpService.get(`${chief}/current`);

//get all current journals
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

//get list of users
const getUsers = () => httpService.get(`${chief}/getUsers`);

//post notifiacation
const postNotification = (values) =>
  httpService.post(`${chief}/notifications`, values);

//assign supervisor to the journal
const assignSupervisor = (id, value) =>
  httpService.put(
    `${chief}/allotSuperVisor/${id}`,
    { supervisor: value },
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
const getUserDetailsById = (id) => httpService.get(`${chief}/details/${id}`);

//Issue Launch
const launchIssue = (values) => httpService.put(`${chief}/issues`, values);

// delete Journal
const deleteJournal = (id) => httpService.delete(`${chief}/${id}`);

//update Editor Information
const updateInformation_chief = (profile) =>
  httpService.put(`${chief}/${profile.id}`, profile);

//get Chief Editor friends
const getChiefFriends = () => httpService.get(`${chief}/allUsers`);

//get User Count
const getTotalUsers = () => httpService.get(`${chief}/count/user`);

//get editor count
const getEditorCount = () => httpService.get(`${chief}/count/edit`);

//get journal count
const getJournlCount = () => httpService.get(`${chief}/count/journal`);

//delete User
const deleteUser = (id) => httpService.delete(`${chief}/users/${id}`);

//change account status
const accountStatus = (body) =>
  httpService.put(`${chief}/accountStatus/${body.id}?status=${body.status}`);
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
const getReviwedContent_editor = (id) =>
  httpService.get(`${editor}/reviewedJournals/${id}`);

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

//get Editor Friends
const getEditorFriends = (id) => httpService.get(`${editor}/friend/${id}`);

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

//const get Friend
const getFriend_publisher = (id) =>
  httpService.get(`${publisher}/friend/${id}`);
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

/*
*
Conversation
*/

//get all conversaions
const getConversations = (id) => httpService.get(`${convo}/${id}`);

//create a new convo
const newConversationEndpoint = (requestBody) =>
  httpService.post(`${convo}/convoText`, requestBody);

const updateConvoCounterEndpoint = (id) => httpService.put(`${convo}/${id}`);
/*


Messages



*/
//get one to one conversation
const getMessagesUser = (id) => httpService.get(`${message}/${id}`);

const sendMessage = (body) => httpService.post(`${message}`, body);

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
  getJournals,
  deleteJournal,
  getCurrentJournals,
  getUsers,
  updateInformation_chief,
  getConversations,
  getMessagesUser,
  sendMessage,
  getChiefFriends,
  getTotalUsers,
  getEditorCount,
  getJournlCount,
  newConversationEndpoint,
  updateConvoCounterEndpoint,
  deleteUser,
  accountStatus,
  getEditorFriends,
  getFriend_publisher,
};

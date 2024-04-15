// middlewares.js
import loginMiddleware from './loginMiddleware';
import SignJoinColocMiddleware from './SignJoinColocMiddleware';
import SignUpColocMiddleware from './SignUpColocMiddleware';
import createProfileMiddleware from './CreateProfileMiddleware';
import rulesMiddleware from './rulesMiddleware';
import rulesMiddlewareUpdate from './rulesMiddlewareUpdate';
import profileMiddleware from './ProfileMiddleware';
import profileMiddlewareUpdate from './ProfileMiddlewareUpdate';
import colocUsersMiddleware from './colocUsersMiddleware';
import TaskMiddleware from './TaskMiddleware';
import ArticleMiddleware from './ArticleMiddleware';
import CreateTaskMiddleware from './CreateTaskMiddleware';
import CreateArticleMiddleware from './CreateArticleMiddleware';
import UpdateTaskMiddleware from './UpdateTaskMiddleware';
import DeleteTaskMiddleware from './DeleteTaskMiddleware';
import DeleteArticleMiddleware from './DeleteArticleMiddleware';
import paramMiddleware from './ParamMiddleware';
import ParamUpdateMiddleware from './ParamUpdateMiddleware';
import DeleteParamMiddleware from './DeleteParamMiddleware';
import AvatarCreateMiddleware from './AvatarCreateMiddleware';

const middlewares = [
  loginMiddleware,
  SignJoinColocMiddleware,
  SignUpColocMiddleware,
  createProfileMiddleware,
  rulesMiddleware,
  rulesMiddlewareUpdate,
  profileMiddleware,
  profileMiddlewareUpdate,
  colocUsersMiddleware,
  TaskMiddleware,
  ArticleMiddleware,
  CreateTaskMiddleware,
  CreateArticleMiddleware,
  UpdateTaskMiddleware,
  DeleteTaskMiddleware,
  DeleteArticleMiddleware,
  paramMiddleware,
  ParamUpdateMiddleware,
  DeleteParamMiddleware,
  AvatarCreateMiddleware,
];
export default middlewares;

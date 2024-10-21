const Page = require('../models/page');
const PageFollow = require('../models/pageFollow');
const BasicService = require('../utils/services/basicService');
const bindMethodsWithThisContext = require('../utils/classes/bindMethodsWithThisContext');
const { TargetNotExistException, IncorrectPermission, BadRequestException, TargetAlreadyExistException } = require('../utils/exceptions/commonExceptions');
const { updateObjectIfUpdateFieldDataDefined } = require('../utils/objects');
const { ROLES } = require('../utils/constants/users');

class PageService extends BasicService {
    constructor() {
        super();

        bindMethodsWithThisContext(this);
    }
    async createPage({ currentUser, name, description }) {
        const page = new Page({
            name,
            description,
            admin: [currentUser.userId],
        });

        return await page.save();
    }
    validateUserCanModifyPage(page, userId) {
        if (!page.admin.includes(userId)) {
            throw new IncorrectPermission();
        }
    }
    validateCurrentUserCanModifyPage(page, currentUser) {
        if (currentUser.role == ROLES.USER) {
            this.validateUserCanModifyPage(page, currentUser.userId);
        }
    }
    async findPageById({ id, currentUser }) {
        const page = await Page.findById(id);
        if (!page) {
            throw new TargetNotExistException('Page not exist');
        }
        return page;
    }
    async getAllPageWhichUserManagerWithPaginate({ userId, pageNumber }) {
        const result = await this.getPaginatedResults({
            model: Page,
            query: {
                admin: { $in: [userId] },
            },
            page: pageNumber
        });

        return result;
    }
    async getAllPageWhichUserFollowingWithPaginate({ userId, pageNumber }) {
        const result = await this.getPaginatedResults({
            model: PageFollow,
            query: {
                user: userId,
                blockedByUser: false,
                blockedByPage: false,
            },
            page: pageNumber,
        });

        await PageFollow.populate(result.results, { path: 'page' });
        return result;
    }
    async updatePage({ id, currentUser, name, description, avatar, cover, location }) {
        const page = await this.findPageById(id);

        this.validateCurrentUserCanModifyPage(page, currentUser);
        updateObjectIfUpdateFieldDataDefined(page, { name, description, avatar, cover, location });

        //TODO: push notification to followers
        return await page.save();
    }
    async followPage({ currentUser, id }) {
        const page = await this.findPageById(id);
        const existFollow = PageFollow.findOne({
            user: currentUser.userId,
            page: page._id,
        });
        if (existFollow) {
            throw new TargetAlreadyExistException('You have already follow this page');
        }
        const pageFollow = new PageFollow({
            user: currentUser.userId,
            page: page._id,
        });

        return await pageFollow.save();
    }
    async unFollowPage({ currentUser, id }) {
        const pageFollow = await PageFollow.findOneAndDelete({
            page: id,
            user: currentUser.userId,
            blockedByUser: false,
            blockedByPage: false,
        });
        if (!pageFollow) {
            throw new BadRequestException('The page is not exist or you have not follow this page or you have been blocked or block this page');
        }
    }
    async deletePage({ id, currentUser }) {
        const page = await this.findPageById({ id });

        this.validateCurrentUserCanModifyPage(page, currentUser);
        //TODO: fire command which delete all related post
        await PageFollow.deleteMany({
            page: page._id
        });
        await Page.findByIdAndDelete(id);
    }
}

module.exports = new PageService();
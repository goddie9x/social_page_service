const pageService = require('../services/pageService');
const bindMethodsWithThisContext = require('@godsocial/utils/classes/bindMethodsWithThisContext');
const BasicController = require('@godsocial/utils/controllers/basicController');

class PageController extends BasicController {
    constructor() {
        super();
        bindMethodsWithThisContext(this);
    }
    async createPage(req, res) {
        try {
            const page = await pageService.createPage(req.body);

            res.status(201).json(page);
        } catch (error) {
            return this.handleResponseError(res, error);
        }
    }
    async deletePage(req, res) {
        try {
            await pageService.deletePage({ ...req.params, ...req.body });

            res.status(204).json({ message: 'Delete page successful' });
        } catch (error) {
            return this.handleResponseError(res, error);
        }
    }
    async findPageById(req, res) {
        try {
            const page = await pageService.findPageById({ ...req.params, ...req.body });

            res.status(200).json(page);
        } catch (error) {
            return this.handleResponseError(res, error);
        }
    }
    async followPage(req, res) {
        try {
            const pageFollow = await pageService.followPage(req.body);

            res.status(200).json(pageFollow);
        } catch (error) {
            return this.handleResponseError(res, error);
        }
    }
    async getAllPageWhichUserFollowingWithPaginate(req, res) {
        try {
            const currentUser = req.body.currentUser;
            if (!currentUser?.userId) {
                return res.status(401).json({ error: 'Authentication required' });
            }
            const { currentUser: _ignored, ...query } = req.query;
            // Always scope to the authenticated user - never trust a userId from query
            const result = await pageService.getAllPageWhichUserFollowingWithPaginate({
                ...query,
                userId: currentUser.userId,
            });

            res.status(200).json(result);
        } catch (error) {
            return this.handleResponseError(res, error);
        }
    }
    async getAllPageWhichUserManagerWithPaginate(req, res) {
        try {
            const page = await pageService.getAllPageWhichUserManagerWithPaginate(req.query);

            res.status(200).json(page);
        } catch (error) {
            return this.handleResponseError(res, error);
        }
    }
    async unFollowPage(req, res) {
        try {
            await pageService.unFollowPage({ ...req.params, ...req.body });

            res.status(203).json({ message: 'Unfollow page successful' });
        } catch (error) {
            return this.handleResponseError(res, error);
        }
    }
    async updatePage(req, res) {
        try {
            const page = await pageService.updatePage(req.body);

            res.status(203).json(page);
        } catch (error) {
            return this.handleResponseError(res, error);
        }
    }
}

module.exports = new PageController();
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const { post: Post } = prisma;

export default {
    getAll(req, res) {
        Post.findMany()
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || 'Some error occured when retrieving users',
                });
            });
    },
    get(req, res) {
        const { id } = req.params;

        Post.findUnique({
            where: {
                id: parseInt(id),
            },
        })
            .then((data) => {
                data
                    ? res.status(200).send(data)
                    : res.status(404).send({
                          message: `Cannot find post with id=${id}`,
                      });
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occured when retrieving user with id=${id}`,
                });
            });
    },
    create(req, res) {
        const { userId, title, content, description } = req.body;

        Post.create({
            data: {
                userId: parseInt(userId),
                title: title,
                content: content,
                description: description,
            },
        })
            .then(() => {
                res.status(201).send({
                    message: `Post was created successfully`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occured when creating user`,
                });
            });
    },
    update(req, res) {
        const { id } = req.params;
        const { title, content, description } = req.body;

        Post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title: title,
                content: content,
                description: description,
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `Post was updated successfully`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occured when updating user with id=${id}`,
                });
            });
    },
    delete(req, res) {
        const { id } = req.params;

        Post.delete({
            where: {
                userId: parseInt(id),
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `Post was deleted successfully`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occured when deleting user with id=${id}`,
                });
            });
    },
    deleteMany(req, res) {
        const { id } = req.params;
        const postIds = id.split(',');

        Post.deleteMany({
            where: {
                id: {
                    in: postIds.map((postId) => parseInt(postId)),
                },
            },
        })
            .then(() => {
                res.status(200).send({
                    message: `Posts were deleted successfully`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message || `Some error occured when deleting posts with ids=${id}`,
                });
            });
    },
};

const ReferralNode = ({ node }) => {
  return (
    <li>
      {node.name}
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map(child => (
            <ReferralNode key={child._id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const ReferralTree = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <h3>Referral Tree</h3>
      <ul>
        <ReferralNode node={data} />
      </ul>
    </div>
  );
};

export default ReferralTree;

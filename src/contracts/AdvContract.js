
								   
// ██████╗ ██╗   ██╗███╗   ██╗███████╗    ██████╗ ███╗   ██╗███████╗
// ██╔══██╗██║   ██║████╗  ██║██╔════╝   ██╔═══██╗████╗  ██║██╔════╝
// ██████╔╝██║   ██║██╔██╗ ██║█████╗     ██║   ██║██╔██╗ ██║█████╗  
// ██╔══██╗██║   ██║██║╚██╗██║██╔══╝     ██║   ██║██║╚██╗██║██╔══╝  
// ██║  ██║╚██████╔╝██║ ╚████║███████╗██╗╚██████╔╝██║ ╚████║███████╗
// ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
					


"use strict";

var advPrototype = function(text) {
	if (text) {
		let obj = JSON.parse(text);
		//advs
		this.index = obj.index;
		this.owner = obj.owner;
		this.preValue = obj.preValue;
		this.title = obj.title;
		this.desc = obj.desc;
		this.base64 = obj.base64;
		this.url = obj.url;
		this.counts = obj.counts;
	} 
	else {
			this.owner = "n1QueeC42iF8hz1PFByzB4qbndSBTum1AgN";
			this.preValue = 1000000000000000;
			this.title = "";
			this.desc = "";
			this.base64 = "";
			this.url = "";
			this.counts = 0;
		}
};

advPrototype.prototype = {
	toString: function() {
		return JSON.stringify(this);
	}
};

var claimPrototype = function(text) {
	if (text) {
		let obj = JSON.parse(text);
		this.claimCounts = obj.claimCounts;
		this.claimedTime = obj.claimedTime;
	} 
	else {
			this.claimCounts = 0;
			this.claimedTime = "";
	}
};

claimPrototype.prototype = {
	toString: function() {
		return JSON.stringify(this);
	}
};

var advContract = function() {
	LocalContractStorage.defineProperty(this, "userNumber");
	LocalContractStorage.defineProperty(this, "claimAmount");
	LocalContractStorage.defineProperty(this, "rate");
	LocalContractStorage.defineProperty(this, "toPreUserRate");
	LocalContractStorage.defineProperty(this, "adminAddress");
	LocalContractStorage.defineMapProperty(this, "claimInfo",{
		parse(text) {
			return new claimPrototype(text)
		},
		stringify(o) {
			return o.toString()
		}
	});

  	LocalContractStorage.defineMapProperty(this, "advs", {
		parse(text) {
			return new advPrototype(text)
		},
		stringify(o) {
			return o.toString()
		}
  })
};

advContract.prototype = {
	init(){
		this.adminAddress = "n1QueeC42iF8hz1PFByzB4qbndSBTum1AgN";
		this.claimAmount = 0.001;
		this.rate = 0.2;
		this.toPreUserRate = 0.5;
	},

	/**
	 * 签到逻辑
	 * 
	 * getClaimCounts() 	返回个人领取次数
	 * claim()				签到获得NAS（数量可变）
	 * deposit()			充值NAS
	 */

	getClaimCounts() {
		let from = Blockchain.transaction.from;
		let claimInfo = this.claimInfo.get(from);
		if (claimInfo) {
			return claimInfo.claimCounts
		} else {
			return 0
		}
	},

	claim() {
		let from = Blockchain.transaction.from;
		let value = Blockchain.transaction.value;
		let claimInfo = this.claimInfo.get(from);
		let now = new Date().getTime();
		let claimPro = new claimPrototype();		
		let claimAmount = this.claimAmount;

		if (value != 0) throw new Error("Insufficient balance.");
		
		if(claimInfo){
				if (this._isClaimed(claimInfo.claimedTime)) {
					throw new Error("you can't claim twice one day.");
				}
				claimInfo.claimedTime = now;
				claimInfo.claimCounts += 1;
				this.claimInfo.set(from, claimInfo);
		}
		else{
				claimPro.claimCounts = 1;
				claimPro.claimedTime = now;
				this.claimInfo.set(from,claimPro)
		}

		let result = Blockchain.transfer(from, claimAmount * 1000000000000000000);
		if (!result) {
			Event.Trigger("Transfer", {
				Transfer: {
				from: Blockchain.transaction.to,
				to: from,
				value: claimAmount * 1000000000000000000
				}
			});
			throw new Error("claim transfer failed.");
		}
	},

	deposit() {
		let value = Blockchain.transaction.value;
		this.isAdmin();
		if (!value) throw new Error("Insufficient balance.");
	},

	_isClaimed: function (claimedTime) {
		let now = new Date()
		let lastDate = new Date(claimedTime)
		return [now.getFullYear(), now.getMonth(), now.getDate()].join('') ===
		[lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()].join('')
	},

	isClaimedToday: function() {
		let from = Blockchain.transaction.from;
		let claimInfo = this.claimInfo.get(from);
		if (claimInfo) {
			return this._isClaimed(claimInfo.claimedTime)
		} else {
			return false
		}
	},

  /**
   * 
   * 抢占广告位逻辑.
   *
   * Object should be real object, not stringified.
   *
   * @param id        每个广告位的唯一标识
   * @param desc      广告位的描述字段
   * @param title	  广告位的标题字段
   * @param desc      广告位的描述字段
   * @param base64    图片的base64地址
   * @param url       广告位的链接
   *
   */

  add(id, title, desc, base64, url) {
	let _id = Number(id)
	let currentPrototype = new advPrototype();
	let value = Blockchain.transaction.value;
	let newOwner = Blockchain.transaction.from;
	let rate = this.rate;
	let toPreUserRate = this.toPreUserRate;
	let getPro = this.advs.get(_id) || new advPrototype();
	let owner = getPro.owner;
	let preValue = getPro.preValue;
	let counts = getPro.counts;
	let adminAddress = this.adminAddress;
	let profit = value - preValue;
	let transferValue = Number(preValue) + Number(profit * toPreUserRate);

	if(!_id) throw new Error("id should be type of Number");
    if (profit / preValue >= rate) {

		currentPrototype.preValue = value;
		currentPrototype.owner = newOwner;
		currentPrototype.index = _id;
		currentPrototype.title = title;
		currentPrototype.desc = desc;
		currentPrototype.base64 = base64;
		currentPrototype.url = url;
		currentPrototype.counts =counts+ 1;
		
		this.advs.set(id, currentPrototype)
		/**
		 * 从合约账户中把新的value
		 * 以一定的比例发送给上一个广告主
		 */
		let toAdvser = Blockchain.transfer(owner, transferValue);

		if (!toAdvser) {
			Event.Trigger("Transfer", {
				Transfer: {
				from: Blockchain.transaction.to,
				to: owner,
				value: transferValue
				}
			});
			throw new Error("add transfer toAdvser failed.result:" + transferValue);
		}

    } else {
      throw new Error("value invalid")
    }
    return true;
  },

  get(id) {
    return this.advs.get(id)
  },

  delete(id) {
    let currentPrototype = this.advs.get(id);
    if (!currentPrototype) {
      throw new Error("adv not found");
    }
    this.advs.del(id);
  },

  getAll(offset, limit) {
    let result = [];
    for (let i = offset; i < limit + offset; i++) {
      let ad = this.advs.get(i);
      if (ad) {
        result.push(ad);
      }
	}
		
    return result;
  },

  /**
   * public function
   * 
   */
  
  verifyAddress(address) {
		let result = Blockchain.verifyAddress(address);
		if(!result){
			return false;
		}
		return true;
	},

  isAdmin(){
		let from = Blockchain.transaction.from;
		if(from != this.adminAddress){
			throw new Error("Permission denied.")	
		}
		return true;
  },

  changeClaimAmount(amount){
		this.isAdmin();
		this.claimAmount = amount;
  },

	getClaimAmount(){
		return this.claimAmount;
	},

  changeAdminAddress(newAddress){
		this.isAdmin();
		this.adminAddress = newAddress;
	},
	
	getAdminAddress(){
		return this.adminAddress;
	}
}

module.exports = advContract;
